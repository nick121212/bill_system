import * as _ from "lodash";
import { Repository, Not, Equal, IsNull, EntityManager, Like } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  CustomerEntity,
  ProductEntity,
  ProductPriceEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";
import { toPrice } from "@/common/utils/price";
import { ProductService } from "@/modules/product/product.service";

import {
  CustomerPriceRequest,
  CustomerQuery,
  CustomerRequest,
} from "./customer.interface";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity) private repo: Repository<CustomerEntity>,
    @InjectRepository(ProductEntity)
    private repoForProduct: Repository<ProductEntity>,
    @InjectRepository(ProductPriceEntity)
    private repoForPrice: Repository<ProductPriceEntity>,
    private productService: ProductService,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }
  ) {}

  async all(
    query: CustomerQuery,
    user: ActiveUserData
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

    return {
      rows,
      count,
    };
  }

  async getById(
    id?: number,
    loadRelationIds = false
  ): Promise<CustomerEntity | null> {
    const data = await this.repo.findOne({
      where: {
        id,
      },
      loadRelationIds: loadRelationIds,
    });

    return data || null;
  }

  async getByIdWithError(id?: number): Promise<CustomerEntity> {
    const customer = await this.getById(id);

    if (!customer) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "CustomerEntity",
        }
      );
    }

    return customer;
  }

  async getPriceById(id?: number) {
    const customer = await this.getByIdWithError(id);

    const [rows, count] = await this.repoForPrice
      .createQueryBuilder("product_price")
      .where({
        customer: customer,
      })
      .innerJoinAndSelect(
        "product_price.product",
        "product",
        "product.id = product_price.productId"
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
            })
          );
        }

        return await entityManager.save(pricesEntities);
      }
    );
  }

  async create(
    body: CustomerRequest,
    user: ActiveUserData
  ): Promise<CustomerEntity> {
    const { ...rest } = body;
    const customer = new CustomerEntity().extend({
      ...rest,
      companyId: user.companyId,
      userId: user.id,
    });

    return await this.repo.save(customer);
  }

  async update(id: number, body: CustomerRequest): Promise<CustomerEntity> {
    const customer = await this.getByIdWithError(id);
    const { ...rest } = body;

    customer.extend(rest);

    return this.repo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.getByIdWithError(id);

    return this.repo.softRemove(customer);
  }
}
