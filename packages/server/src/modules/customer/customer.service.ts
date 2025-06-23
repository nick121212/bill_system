import * as _ from 'lodash';
import xlsx from 'node-xlsx';
import { Repository, EntityManager, Like } from 'typeorm';
import { ApiStatusCode } from '@bill/database';
import {
  CustomerEntity,
  ProductPriceEntity,
  UserEntity,
} from '@bill/database/dist/entities';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiException } from '@/common/exception/api.exception';
import dataFilter from '@/common/utils/dataFilter';
import { dataDesensitization } from '@/common/utils/phone';
import { toPrice } from '@/common/utils/price';
import { ProductService } from '@/modules/product/product.service';

import {
  CustomerPriceRequest,
  CustomerQuery,
  CustomerRequest,
} from './customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity) private repo: Repository<CustomerEntity>,
    @InjectRepository(ProductPriceEntity)
    private repoForPrice: Repository<ProductPriceEntity>,
    private productService: ProductService,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
  ) {}

  async all(
    query: CustomerQuery,
  ): Promise<{ rows: CustomerEntity[]; count: number }> {
    const { fullname, phone, ...rest } = query.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...rest,
        ...(fullname ? { fullname: Like(`%${fullname}%`) } : {}),
        ...(phone ? { phone: Like(`%${phone}%`) } : {}),
        ...dataFilter(this.request.userEntity),
      },
      loadRelationIds: true,
      withDeleted: false,
    });

    rows.map((row) => {
      row.phone = dataDesensitization(row.phone, 'tel', 3, 4);
    });

    return {
      rows,
      count,
    };
  }

  async getById(
    id?: number,
    loadRelationIds = false,
  ): Promise<CustomerEntity | null> {
    const data = await this.repo.findOne({
      where: {
        id,
      },
      loadRelationIds: loadRelationIds,
    });

    if (data) {
      data.phone = dataDesensitization(data.phone, 'tel', 3, 4);
    }

    return data || null;
  }

  async getByIdWithError(id?: number): Promise<CustomerEntity> {
    const customer = await this.getById(id);

    if (!customer) {
      throw new ApiException(
        'can not find recoed',
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: 'CustomerEntity',
        },
      );
    }

    return customer;
  }

  async getPriceById(id?: number) {
    const customer = await this.getByIdWithError(id);

    const [rows, count] = await this.repoForPrice
      .createQueryBuilder('product_price')
      .where({
        customer: customer,
      })
      .innerJoinAndSelect(
        'product_price.product',
        'product',
        'product.id = product_price.productId',
      )
      .getManyAndCount();

    return {
      rows,
      count,
      map: _.keyBy(rows, (r) => {
        return r.product?.id;
      }),
    };
  }

  async savePrices(id: number, body: CustomerPriceRequest) {
    const customer = await this.getByIdWithError(id);

    return this.repo.manager.transaction(
      async (entityManager: EntityManager) => {
        const pricesEntities: ProductPriceEntity[] = [];

        await this.repoForPrice
          .createQueryBuilder()
          .delete()
          .where({
            customer: {
              id,
            },
          })
          .execute();

        for (const element of body.prices) {
          pricesEntities.push(
            new ProductPriceEntity().extend({
              customer,
              discount: element.discount,
              price: toPrice(element.price),
              product: await this.productService.getById(element.productId),
            }),
          );
        }

        return await entityManager.save(pricesEntities);
      },
    );
  }

  async create(body: CustomerRequest): Promise<CustomerEntity> {
    const { ...rest } = body;
    const customer = new CustomerEntity().extend({
      ...rest,
      companyId: this.request.userEntity.company?.id,
      userId: this.request.userEntity.id,
    });

    return await this.repo.save(customer);
  }

  async update(id: number, body: CustomerRequest): Promise<CustomerEntity> {
    const customer = await this.getByIdWithError(id);
    const { ...rest } = body;

    customer.extend(rest);

    return this.repo.save(customer);
  }

  async updateBalance(id: number, balance?: number): Promise<CustomerEntity> {
    const customer = await this.getByIdWithError(id);

    customer.balance = balance || 0;

    return this.repo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.getByIdWithError(id);

    return this.repo.softRemove(customer);
  }

  async uploadFile(file: Express.Multer.File) {
    const workSheetsFromBuffer = xlsx.parse(file.buffer);

    if (workSheetsFromBuffer.length <= 0) {
      throw new ApiException(
        'can not find recoed',
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          type: 'ProductEntity',
        },
      );
    }

    const workSheet = workSheetsFromBuffer[0];
    const rows = workSheet.data.splice(1);
    const customers: CustomerEntity[] = [];

    for (const row of rows) {
      customers.push(
        new CustomerEntity().extend({
          fullname: row[1] as string,
          phone: (row[3] as string) || '',
          email: (row[2] as string) || '',
          contact: '',
          paytime: (row[6] as number) * 1 || 0,
          address: (row[4] as string) || '',
          desc: (row[5] as string) || '',
          companyId: this.request.userEntity.company?.id,
          userId: this.request.userEntity.id,
          level: 0,
          discount: (row[7] as number) * 1 || 100,
          template: 0,
          no: '',
        }),
      );
    }

    const result = await this.repo.save(customers);

    return result;
  }
}
