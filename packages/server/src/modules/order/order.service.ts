import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { Between, EntityManager, In, Like, Repository } from 'typeorm';
import {
  ChargeEntity,
  OrderCategoryEntity,
  OrderEntity,
  OrderProductEntity,
  ProductCategoryEntity,
  ProductEntity,
  UserEntity,
} from '@bill/database';
import { ApiStatusCode } from '@bill/database/dist/enums/ApiStatusCode';
import { ChargeType } from '@bill/database/dist/enums/ChargeType';
import { OrderStatus } from '@bill/database/dist/enums/OrderStatus';
import { PaymentMethod } from '@bill/database/dist/enums/PaymentMethod';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiException } from '@/common/exception/api.exception';
import dataFilter from '@/common/utils/dataFilter';
import { dataDesensitization } from '@/common/utils/phone';
import { toPrice } from '@/common/utils/price';

import { ChargeService } from '../charge/charge.service';
import { CustomerService } from '../customer/customer.service';
import { RedisService } from '../redis/redis.service';
import {
  OrderProduct,
  OrderQuery,
  OrderRequest,
  OrderStatusRequest,
} from './order.interface';

@Injectable()
export class OrderService {
  constructor(
    private em: EntityManager,
    @InjectRepository(OrderEntity) private repo: Repository<OrderEntity>,
    @InjectRepository(OrderCategoryEntity)
    private repoCate: Repository<OrderCategoryEntity>,
    @InjectRepository(OrderProductEntity)
    private repoPro: Repository<OrderProductEntity>,
    private customerService: CustomerService,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
    private readonly redisService: RedisService,
    private chargeService: ChargeService,
  ) {}

  async all(
    query: OrderQuery,
  ): Promise<{ rows: OrderEntity[]; count: number }> {
    const { startDate, endDate, no, phone, ...rest } = query.where ?? {};
    const whereClause = {
      ...rest,

      ...(startDate && endDate
        ? {
            createTime: Between(startDate, endDate),
          }
        : {}),

      ...(no && {
        no: `${this.request.userEntity.company?.id}-${no}`,
      }),

      ...(phone && {
        customer: {
          phone: Like(`%${phone}%`),
        },
      }),

      ...dataFilter(this.request.userEntity),
    };
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: whereClause,
      relations: {
        customer: true,
        user: true,
      },
      order: query.order,
    });

    return {
      rows,
      count,
    };
  }

  async getByNo(no: string): Promise<OrderEntity | null> {
    const data = await this.repo.findOne({
      where: {
        no,
      },
    });

    return data || null;
  }

  async getById(id?: number): Promise<OrderEntity | null> {
    const data = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        customer: true,
        charge: true,
      },
    });

    if (data?.customer) {
      data.customer.phone = dataDesensitization(
        data.customer.phone,
        'tel',
        3,
        4,
      );
    }

    return data || null;
  }

  async getByIdWithError(id?: number): Promise<OrderEntity> {
    const order = await this.getById(id);

    if (!order) {
      throw new ApiException(
        'can not find record',
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: 'OrderEntity',
        },
      );
    }

    return order;
  }

  async getByIdWithCategories(id?: number) {
    const categories = (await this.repoCate.find({
      where: {
        orderId: id,
      },
      relations: {},
    })) as (OrderCategoryEntity & {
      products: OrderProduct[];
    })[];

    const categoryProducts = await this.repoPro.find({
      where: {
        orderCategory: {
          id: In(categories.map((c) => c.id)),
        },
      },
      relations: {
        orderCategory: true,
        product: {
          unit: true,
        },
        productCategory: true,
      },
    });

    const categoryMap = _.keyBy(categories, 'id');

    for (const cp of categoryProducts) {
      const category = categoryMap[cp.orderCategory.id];

      if (category) {
        if (!category.products) {
          category.products = [];
        }
        category.products.push(cp);
      }
    }

    return categories;
  }

  async saveData(child: OrderEntity, body: OrderRequest, remove = false) {
    const customer = await this.customerService.getByIdWithError(
      body.customerId,
    );

    if (!customer.balance || customer.balance < (body.realTotalPrice || 0)) {
      throw new ApiException(
        'balance not enough',
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: body.customerId,
          type: 'CustomerEntity',
        },
      );
    }

    return await this.em.transaction(async (entityManager: EntityManager) => {
      const payment = body.payment || PaymentMethod.COUPAY;
      let charge = new ChargeEntity();

      if (child.charge?.balance) {
        charge = await entityManager.save(ChargeEntity, {
          customerId: body.customerId,
          balance: Math.abs(child.charge.balance),
          extra: 0,
          type: ChargeType.RETURN,
          companyId: this.request.userEntity.company?.id,
          userId: this.request.userEntity.id,
        });

        if (!customer.balance) {
          customer.balance = 0;
        }

        customer.balance += Math.abs(child.charge?.balance || 0);
      }

      if (payment === PaymentMethod.COUPAY) {
        charge = await entityManager.save(ChargeEntity, {
          customerId: body.customerId,
          balance: -(body.realTotalPrice || 0),
          extra: 0,
          type: ChargeType.CONSUME,
          companyId: this.request.userEntity.company?.id,
          userId: this.request.userEntity.id,
        });
        child.status = OrderStatus.PAYED;

        customer.balance = (customer.balance || 0) - (body.realTotalPrice || 0);
      }
      const order = await entityManager.save(OrderEntity, {
        ...child,
        totalPrice: 0,
        no: body.no,
        chargeId: charge ? charge.id : undefined,
        discount: customer.discount,
        status: child.status || OrderStatus.UNPAYED,
        customer: customer,
        templateId: body.templateId,
        realTotalPrice: body.realTotalPrice,
      });
      const categories: Promise<OrderCategoryEntity>[] = [];
      const products: Promise<OrderProductEntity>[] = [];

      if (remove) {
        await this.repoPro.delete({
          orderId: order.id,
        });
        await this.repoCate.delete({
          orderId: order.id,
        });
      }

      order.totalPrice = 0;

      for (const c of body.categories) {
        const orderCategory = new OrderCategoryEntity().extend({
          orderId: order.id,
          name: c.name,
        });
        categories.push(entityManager.save(orderCategory));

        for (const p of c.products) {
          const product = await entityManager.findOneByOrFail(ProductEntity, {
            id: p.productId,
          });
          const productCategory =
            await entityManager.findOneByOrFail<ProductCategoryEntity>(
              ProductCategoryEntity,
              {
                id: p.productCategoryId,
              },
            );

          const orderProduct = new OrderProductEntity().extend({
            productId: p.productId,
            name: product.name,
            price: toPrice(p.price),
            discount: p.discount || 100,
            count: p.count,
            orderCategory: orderCategory,
            productCategory: productCategory,
            orderId: order.id,
            times: p.times,
            totalPrice: p.count * toPrice(p.price) * p.times,
            // categoryId: p.productCategoryId,
          });

          order.totalPrice += orderProduct.totalPrice;

          products.push(entityManager.save(orderProduct));
        }
      }

      // order.totalPrice = (order.totalPrice * customer.discount) / 100;

      await entityManager.save(OrderEntity, order);
      await Promise.all([
        ...categories,
        ...products,
        entityManager.save(customer),
        // entityManager.save(order),
      ]).catch((e) => {
        throw e;
      });

      return order;
    });
  }

  async create(body: OrderRequest): Promise<OrderEntity> {
    const { categories, no, ...rest } = body;
    const order = new OrderEntity().extend({
      ...rest,
      no,
      companyId: this.request.userEntity.company?.id,
      userId: this.request.userEntity.id,
    });
    const key = `${this.request.userEntity.company?.id}-${dayjs().format('YYYYMMDD')}`;
    const orderNo = await this.generateIndex(key);
    const orderFromNo = await this.getByNo(orderNo);

    console.log(categories);

    if (orderFromNo) {
      throw new ApiException(
        'order no already exists',
        ApiStatusCode.KEY_ALREADY_EXISTS,
        HttpStatus.OK,
        {
          no: orderNo,
          type: 'OrderEntity',
        },
      );
    }

    body.no = orderNo;

    return this.saveData(order, body).then(async (order) => {
      await this.redisService.incr(key);

      return order;
    });
  }

  async update(id: number, body: OrderRequest): Promise<OrderEntity> {
    const order = await this.getByIdWithError(id);
    const { categories, ...rest } = body;

    console.log(categories);

    order.extend(rest);

    return this.saveData(order, body, true);
  }

  async changeStatus(
    id: number,
    body: OrderStatusRequest,
  ): Promise<OrderEntity> {
    const order = await this.getByIdWithError(id);

    if (order.status !== OrderStatus.UNPAYED) {
      throw new ApiException(
        'Status has been closed.',
        ApiStatusCode.UNKOWN_ERROR,
        HttpStatus.OK,
      );
    }

    if (body.status === OrderStatus.UNPAYED) {
      return order;
    }

    order.extend(body);

    return this.em.save(OrderEntity, order);
  }

  async remove(id: number) {
    const customer = await this.getByIdWithError(id);

    return this.repo.softRemove(customer);
  }

  async generateIndex(key: string) {
    const index = await this.redisService.get(key);

    if (!index) {
      return `${key}_1`;
    }

    return `${key}_${parseInt(index) + 1}`;
  }
}
