import * as _ from "lodash";
import {
  Between,
  EntityManager,
  In,
  LessThan,
  MoreThan,
  Repository,
} from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  OrderCategoryEntity,
  OrderEntity,
  OrderProductEntity,
  ProductCategoryEntity,
  ProductEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { OrderStatus } from "@bill/database/dist/enums/OrderStatus";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";

import { CustomerService } from "../customer/customer.service";
import {
  OrderProduct,
  OrderQuery,
  OrderRequest,
  OrderStatusRequest,
} from "./order.interface";

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
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }
  ) {}

  async all(
    query: OrderQuery,
    user: ActiveUserData
  ): Promise<{ rows: OrderEntity[]; count: number }> {
    const { startDate, endDate, ...rest } = query.where ?? {};
    const whereClause = {
      ...rest,

      ...(startDate && endDate
        ? {
            createTime: Between(startDate, endDate),
          }
        : {}),

      ...dataFilter(this.request.userEntity),
    };
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: whereClause,
      relations: {
        customer: true,
      },
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<OrderEntity | null> {
    const data = await this.repo.findOne({
      where: {
        id,
      },
    });

    return data || null;
  }

  async getByIdWithError(id?: number): Promise<OrderEntity> {
    const order = await this.getById(id);

    if (!order) {
      throw new ApiException(
        "can not find record",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "OrderEntity",
        }
      );
    }

    return order;
  }

  async getByIdWithCategories(id?: number) {
    await this.getByIdWithError(id);

    const categories = (await this.repoCate.find({
      where: {
        orderId: id,
      },
      relations: {
        category: true,
      },
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
      },
    });

    const categoryMap = _.keyBy(categories, "id");

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
      body.customerId
    );
    return await this.em.transaction(async (entityManager: EntityManager) => {
      const order = await entityManager.save(OrderEntity, {
        ...child,
        totalPrice: 0,
        no: body.no,
        discount: customer.discount,
        status: OrderStatus.UNPAYED,
        customer: customer,
      });
      const categories: Promise<unknown>[] = [];
      const products: Promise<unknown>[] = [];

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
        const productCategory =
          await entityManager.findOneByOrFail<ProductCategoryEntity>(
            ProductCategoryEntity,
            {
              id: c.productCategoryId,
            }
          );

        const orderCategory = new OrderCategoryEntity().extend({
          category: productCategory,
          orderId: order.id,
          name: c.name,
        });
        categories.push(entityManager.save(orderCategory));

        for (const p of c.products) {
          const product = await entityManager.findOneByOrFail(ProductEntity, {
            id: p.productId,
          });

          const orderProduct = new OrderProductEntity().extend({
            productId: p.productId,
            name: product.name,
            price: p.price,
            discount: p.discount,
            count: p.count,
            orderCategory: orderCategory,
            orderId: order.id,
            totalPrice: p.count * p.price * (p.discount / 100),
          });

          order.totalPrice += orderProduct.totalPrice;

          products.push(entityManager.save(orderProduct));
        }
      }
      await entityManager.save(OrderEntity, order);
      await Promise.all([
        ...categories,
        ...products,
        // entityManager.save(order),
      ]).catch((e) => {
        throw e;
      });

      return order;
    });
  }

  async create(body: OrderRequest, user: ActiveUserData): Promise<OrderEntity> {
    const { categories, ...rest } = body;
    const order = new OrderEntity().extend({
      ...rest,
      companyId: user.companyId,
      userId: user.id,
    });

    return this.saveData(order, body);
  }

  async update(id: number, body: OrderRequest): Promise<OrderEntity> {
    const order = await this.getByIdWithError(id);
    const { categories, ...rest } = body;

    order.extend(rest);

    return this.saveData(order, body, true);
  }

  async changeStatus(
    id: number,
    body: OrderStatusRequest
  ): Promise<OrderEntity> {
    const order = await this.getByIdWithError(id);

    if (order.status !== OrderStatus.UNPAYED) {
      throw new ApiException(
        "Status has been closed.",
        ApiStatusCode.UNKOWN_ERROR,
        HttpStatus.OK
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
}
