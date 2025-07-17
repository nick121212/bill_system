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
} from '@bill/database/dist/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
  ) {}

  async resetProducts() {
    await this.em.transaction(async (em) => {
      await em.delete(TemplateCategoryProductEntity, {});
      await em.delete(TemplateCategoryEntity, {});
      await em.delete(ProductCategoryEntity, {});
      await em.delete(ProductPriceEntity, {});

      await em.delete(OrderProductEntity, {});
      await em.delete(OrderCategoryEntity, {});
      await em.delete(OrderEntity, {});

      await em.delete(ProductEntity, {});
      await em.delete(ProductInfoEntity, {});

      await em.delete(ProductUnitEntity, {});
    });

    return 'ok';
  }
}
