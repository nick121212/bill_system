import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import xlsx, { WorkSheet } from 'node-xlsx';
import { Between, In, Like, Repository } from 'typeorm';
import {
  OrderEntity,
  OrderProductEntity,
  UserEntity,
} from '@bill/database/dist/entities';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import dataFilter from '@/common/utils/dataFilter';
import { dataDesensitization } from '@/common/utils/phone';

import { OrderExportRequest } from './order.interface';

const statusMap = {
  '0': '未支付',
  '1': '已支付',
  '2': '已取消',
};

@Injectable()
export class OrderExportService {
  constructor(
    @InjectRepository(OrderEntity) private repo: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private repoPro: Repository<OrderProductEntity>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
  ) {}

  /**
   * 获取订单详情sheet
   * @param orderMap
   * @returns
   */
  generateOrderSheet(orderMap: Record<string, OrderEntity>): WorkSheet<any> {
    const dataSheet1: Array<Array<any>> = [];
    const ranges: any[] = []; //{s: {c: 0, r: 0}, e: {c: 0, r: 3}}; // A1:A4
    let rowIndex = 0;

    for (const key in orderMap) {
      if (Object.prototype.hasOwnProperty.call(orderMap, key)) {
        const order = orderMap[key];

        dataSheet1.push(['订单编号', order.no?.toString(), '', '', '', '', '']);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          '客户',
          order.customer.fullname,
          '',
          '',
          '电话',
          dataDesensitization(order.customer.phone, 'tel', 3, 4),
          '',
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 3, r: rowIndex } });
        ranges.push({ s: { c: 5, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          '地址',
          order.customer.address,
          '',
          '',
          '邮箱',
          order.customer.email,
          '',
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 3, r: rowIndex } });
        ranges.push({ s: { c: 5, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          '结款信息',
          statusMap[order.status],
          '',
          '',
          '订单日期',
          dayjs(order.createTime).format('YYYYMMDD HH:mm:ss'),
          '',
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 3, r: rowIndex } });
        ranges.push({ s: { c: 5, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push(['', '', '', '', '', '', '']);
        ranges.push({ s: { c: 0, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          '分类名称',
          '产品名称',
          '单位',
          '价格(元)',
          '单份数量',
          '份数',
          '总应收金额(元)',
          '实收金额(元)',
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
              p.product?.unit?.name,
              p.price,
              p.count,
              p.times,
              p.totalPrice,
            ]);
            rowIndex++;
          }
        }

        dataSheet1.push(['总价(元)', order.totalPrice, '', '', '', '', '']);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push([
          '实收金额(元)',
          order.realTotalPrice,
          '',
          '',
          '',
          '',
          '',
        ]);
        ranges.push({ s: { c: 1, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;

        dataSheet1.push(['', '', '', '', '', '', '']);
        ranges.push({ s: { c: 0, r: rowIndex }, e: { c: 6, r: rowIndex } });
        rowIndex++;
      }
    }

    return {
      name: 'orders',
      data: dataSheet1,
      options: {
        '!merges': ranges,
      },
    };
  }

  /**
   * 获取订单汇总sheet
   * @param orderMap
   * @returns
   */
  generateSummarySheet(orderMap: Record<string, OrderEntity>): WorkSheet<any> {
    const dataSheet1: Array<Array<string | number | undefined | object>> = [
      ['订单编号', '订单日期', '客户', '总金额(元)', '操作员'],
    ];

    const contentCellStyle = {
      border: {
        top: {
          style: 'medium',
          color: '#000',
        },
        bottom: {
          style: 'medium',
          color: '#000',
        },
        left: {
          style: 'medium',
          color: '#000',
        },
        right: {
          style: 'medium',
          color: '#000',
        },
      },
    };

    for (const key in orderMap) {
      if (Object.prototype.hasOwnProperty.call(orderMap, key)) {
        const order = orderMap[key];

        dataSheet1.push([
          { v: order.no, s: contentCellStyle },
          dayjs(order.createTime).format('YYYYMMDD HH:mm:ss'),
          order.customer.fullname,
          order.totalPrice,
          order.user?.fullname,
        ]);
      }
    }

    return {
      name: 'summary',
      data: dataSheet1,
      options: {},
    };
  }

  /**
   * 生成excel
   * @param orders
   * @param products
   * @returns
   */
  generateExcel(orders: OrderEntity[], products: OrderProductEntity[]) {
    const orderMap = _.keyBy(orders, 'id');

    products.forEach((p) => {
      if (!orderMap[p.orderId].categories) {
        orderMap[p.orderId].categories = [];
      }

      let cate = p.orderCategory;
      const cateIndex = _.findIndex(
        orderMap[p.orderId].categories,
        function (o) {
          return o.id === cate.id;
        },
      );

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

  getQuery(body: OrderExportRequest, key: 'id' | 'orderId' = 'id') {
    if (body.orderIds.length) {
      return {
        where: {
          [key]: In(body.orderIds),
          ...dataFilter(this.request.userEntity),
        },
      };
    }

    if (Object.keys(body.query?.where || {}).length) {
      const { startDate, endDate, no, phone, status, customer } =
        body.query?.where ?? {};
      const whereClause: Record<string, unknown> = {
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
        status,
        ...dataFilter(this.request.userEntity),
      };

      if (customer) {
        whereClause.customer = customer;
      }

      return {
        where: whereClause,
      };
    }

    return {};
  }

  async export(body: OrderExportRequest) {
    const orders = await this.repo.find({
      ...this.getQuery(body),
      relations: {
        customer: true,
        user: true,
      },
    });
    const categoryProducts = await this.repoPro.find({
      where: {
        orderId: In(orders.map((o) => o.id)),
      },
      relations: {
        orderCategory: true,
        product: {
          unit: true,
        },
        productCategory: true,
      },
    });

    const data = this.generateExcel(orders, categoryProducts);

    return xlsx.build(data, {});
  }
}
