import _ from "lodash";
import { EntityManager, In, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  OrderCategoryEntity,
  OrderEntity,
  OrderProductEntity,
  ProductCategoryEntity,
  ProductEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";

import { OrderProduct, OrderQuery, OrderRequest } from "./order.interface";

@Injectable()
export class OrderService {
  constructor(
    private em: EntityManager,
    @InjectRepository(OrderEntity) private repo: Repository<OrderEntity>,
    @InjectRepository(OrderCategoryEntity)
    private repoCate: Repository<OrderCategoryEntity>,
    @InjectRepository(OrderProductEntity)
    private repoPro: Repository<OrderProductEntity>
  ) {}

  async all(
    query: OrderQuery,
    user: ActiveUserData
  ): Promise<{ rows: OrderEntity[]; count: number }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        userId: user.id,
        companyId: user.companyId,
      },
      relations: {
        customer: true,
      },
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<OrderEntity | undefined> {
    const data = await this.repo.findOne({
      where: {
        id,
      },
    });

    return data || undefined;
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
    return await this.em.transaction(async (entityManager: EntityManager) => {
      const order = await entityManager.save(child);
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

      for (const c of body.categories) {
        const productCategory =
          await entityManager.findOneBy<ProductCategoryEntity>(
            ProductCategoryEntity,
            {
              id: c.productCategoryId,
            }
          );

        if (!productCategory) {
          throw new ApiException(
            "can not find recoed",
            ApiStatusCode.KEY_NOT_EXIST,
            HttpStatus.OK,
            {
              id: c.productCategoryId,
              type: "ProductCategory",
            }
          );
        }

        const orderCategory = new OrderCategoryEntity().extend({
          category: productCategory,
          orderId: child.id,
          name: c.name,
        });
        categories.push(entityManager.save(orderCategory));

        for (const p of c.products) {
          const product = await entityManager.findOneBy(ProductEntity, {
            id: p.productId,
          });

          if (!product) {
            throw new ApiException(
              "can not find recoed",
              ApiStatusCode.KEY_NOT_EXIST,
              HttpStatus.OK,
              {
                id: p,
                type: "Product",
              }
            );
          }

          const orderProduct = new OrderProductEntity().extend({
            productId: product.id,
            name: product.name,
            price: p.price,
            discount: p.discount,
            count: p.count,
            orderCategory: orderCategory,
            orderId: child.id,
          });

          products.push(entityManager.save(orderProduct));
        }
      }

      await Promise.all([...categories, ...products]).catch((e) => {
        throw e;
      });

      return order;
    });
  }

  async create(body: OrderRequest, user: ActiveUserData): Promise<OrderEntity> {
    const { ...rest } = body;
    const order = new OrderEntity().extend({
      ...rest,
      companyId: user.companyId,
      userId: user.id,
    });

    return this.saveData(order, body);
  }

  async update(id: number, body: OrderRequest): Promise<OrderEntity> {
    const order = await this.getByIdWithError(id);
    const { ...rest } = body;

    order.extend(rest);

    return this.saveData(order, body, true);
  }

  async remove(id: number) {
    const customer = await this.getByIdWithError(id);

    return this.repo.softRemove(customer);
  }
}
