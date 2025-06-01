import * as dayjs from "dayjs";
import * as _ from "lodash";
import xlsx, { WorkSheet } from "node-xlsx";
import * as fs from "node:fs";
import { Between, EntityManager, In, Like, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  OrderCategoryEntity,
  OrderEntity,
  OrderProductEntity,
  ProductCategoryEntity,
  ProductEntity,
  ProductUnitEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { OrderStatus } from "@bill/database/dist/enums/OrderStatus";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";
import { toPrice } from "@/common/utils/price";

import { CustomerService } from "../customer/customer.service";
import { RedisService } from "../redis/redis.service";
import {
  OrderExportRequest,
  OrderProduct,
  OrderQuery,
  OrderRequest,
  OrderStatusRequest,
} from "./order.interface";

const statusMap = {
  "0": "未支付",
  "1": "已支付",
  "2": "已取消",
};

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
    private readonly redisService: RedisService
  ) {}

  async all(
    query: OrderQuery,
    user: ActiveUserData
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
        templateId: body.templateId,
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
              }
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
        // entityManager.save(order),
      ]).catch((e) => {
        throw e;
      });

      return order;
    });
  }

  async create(body: OrderRequest, user: ActiveUserData): Promise<OrderEntity> {
    const { categories, no, ...rest } = body;
    const order = new OrderEntity().extend({
      ...rest,
      no,
      companyId: user.companyId,
      userId: user.id,
    });
    const key = `${user.companyId}-${dayjs().format("YYYYMMDD")}`;
    const orderNo = await this.generateIndex(key);
    const orderFromNo = await this.getByNo(orderNo);

    if (orderFromNo) {
      throw new ApiException(
        "order no already exists",
        ApiStatusCode.KEY_ALREADY_EXISTS,
        HttpStatus.OK,
        {
          no: orderNo,
          type: "OrderEntity",
        }
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

  async generateIndex(key: string) {
    const index = await this.redisService.get(key);

    if (!index) {
      return `${key}_1`;
    }

    return `${key}_${parseInt(index) + 1}`;
  }

  generateOrderSheet(orderMap: Record<string, OrderEntity>): WorkSheet<any> {
    const dataSheet1: Array<Array<any>> = [];
    const ranges: any[] = []; //{s: {c: 0, r: 0}, e: {c: 0, r: 3}}; // A1:A4
    let rowIndex = 0;

    for (const key in orderMap) {
      if (Object.prototype.hasOwnProperty.call(orderMap, key)) {
        const order = orderMap[key];

        dataSheet1.push(["订单编号", order.no?.toString(), "", "", "", "", ""]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          "客户",
          order.customer.fullname,
          "",
          "",
          "电话",
          order.customer.phone,
          "",
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 3, r: rowIndex } });
        ranges.push({ s: { c: 5, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          "地址",
          order.customer.address,
          "",
          "",
          "邮箱",
          order.customer.email,
          "",
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 3, r: rowIndex } });
        ranges.push({ s: { c: 5, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          "结款信息",
          statusMap[order.status],
          "",
          "",
          "订单日期",
          dayjs(order.createTime).format("YYYYMMDD HH:mm:ss"),
          "",
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 3, r: rowIndex } });
        ranges.push({ s: { c: 5, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push(["", "", "", "", "", "", ""]);
        ranges.push({ s: { c: 0, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          "分类名称",
          "产品名称",
          "单位",
          "价格",
          "单份数量",
          "份数",
          "总计",
        ]);
        rowIndex++;

        for (const c of order?.categories || []) {
          ranges.push({
            s: { c: 0, r: rowIndex },
            e: { c: 0, r: rowIndex - 1 + (c.products?.length || 0) },
          });
          for (const p of c.products || []) {
            dataSheet1.push([
              c.name,
              p.name,
              p.product.unit.name,
              p.price,
              p.count,
              p.times,
              p.totalPrice,
            ]);
            rowIndex++;
          }
        }

        dataSheet1.push(["总价", order.totalPrice, "", "", "", "", ""]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push(["", "", "", "", "", "", ""]);
        ranges.push({ s: { c: 0, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;
      }
    }

    return {
      name: "orders",
      data: dataSheet1,
      options: {
        "!merges": ranges,
      },
    };
  }

  generateSummarySheet(orderMap: Record<string, OrderEntity>): WorkSheet<any> {
    const dataSheet1: Array<Array<string | number | undefined>> = [
      ["订单编号", "订单日期", "客户", "总金额", "操作员"],
    ];

    for (const key in orderMap) {
      if (Object.prototype.hasOwnProperty.call(orderMap, key)) {
        const order = orderMap[key];

        dataSheet1.push([
          order.no,
          dayjs(order.createTime).format("YYYYMMDD HH:mm:ss"),
          order.customer.fullname,
          order.totalPrice,
          order.user?.fullname,
        ]);
      }
    }

    return { name: "summary", data: dataSheet1, options: {} };
  }

  async generateExcel(orders: OrderEntity[], products: OrderProductEntity[]) {
    const orderMap = _.keyBy(orders, "id");

    products.forEach((p) => {
      if (!orderMap[p.orderId].categories) {
        orderMap[p.orderId].categories = [];
      }

      let cate = p.orderCategory;
      let cateIndex = _.findIndex(orderMap[p.orderId].categories, function (o) {
        return o.id === cate.id;
      });

      if (cateIndex < 0) {
        orderMap[p.orderId].categories?.push(cate);
      } else {
        cate = orderMap[p.orderId].categories![cateIndex]!;
      }

      (p.orderCategory as any) = null;

      if (!cate.products) {
        cate.products = [];
      }

      cate.products.push(p);
    });

    return [
      this.generateSummarySheet(orderMap),
      this.generateOrderSheet(orderMap),
    ];
  }

  async export(body: OrderExportRequest) {
    const orders = await this.repo.find({
      where: {
        id: In(body.orderIds),
      },
      relations: {
        customer: true,
        user: true,
      },
    });
    const categoryProducts = await this.repoPro.find({
      where: {
        orderId: In(body.orderIds),
      },
      relations: {
        orderCategory: true,
        product: {
          unit: true,
        },
        productCategory: true,
      },
    });

    const data = await this.generateExcel(orders, categoryProducts);

    const buffer = await xlsx.build(data);

    return buffer;
  }
}
