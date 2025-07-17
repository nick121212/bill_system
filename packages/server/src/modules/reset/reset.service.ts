import { EntityManager, Repository } from 'typeorm';
import {
  OrderCategoryEntity,
  OrderEntity,
  OrderProductEntity,
  ProductCategoryEntity,
  ProductEntity,
  ProductInfoEntity,
  ProductPriceEntity,
  ProductUnitEntity,
  TemplateCategoryEntity,
  TemplateCategoryProductEntity,
  UserEntity,
} from '@bill/database/dist/entities';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import dataFilter from '@/common/utils/dataFilter';

@Injectable()
export class ResetService {
  constructor(
    private em: EntityManager,

    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductUnitEntity)
    private productUnitRepo: Repository<ProductUnitEntity>,
    @InjectRepository(ProductCategoryEntity)
    private productCategoryRepo: Repository<ProductCategoryEntity>,
    @InjectRepository(ProductInfoEntity)
    private productInfoRepo: Repository<ProductInfoEntity>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
  ) {}

  async resetProducts() {
    await this.em.transaction(async (em) => {
      await em
        .createQueryBuilder()
        .delete()
        .from(ProductCategoryEntity)
        .where('userId = :id', { id: this.request.userEntity.id })
        .execute();

      await em
        .createQueryBuilder()
        .delete()
        .from(ProductEntity)
        .where('userId = :id', { id: this.request.userEntity.id })
        .execute();

      await em
        .createQueryBuilder()
        .delete()
        .from(ProductUnitEntity)
        .where('userId = :id', { id: this.request.userEntity.id })
        .execute();
    });

    return 'ok';
  }
}
