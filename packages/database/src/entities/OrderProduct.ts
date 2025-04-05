import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { BaseEntity } from "./Base";
import { OrderCategoryEntity } from "./OrderCategory";
import { ProductEntity } from "./Product";
import { ProductCategoryEntity } from "./ProductCategory";

@Entity({
  name: "order_products",
})
export class OrderProductEntity extends BaseEntity<OrderProductEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column({
    type: "float",
    default: 0,
  })
  price: number;

  @Column()
  discount: number;

  @Column()
  count: number;

  @Column({
    default: 0,
  })
  times: number;

  @Column({
    type: "float",
    default: 0,
  })
  totalPrice: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  /** 关联的产品分类 */
  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn()
  productCategory: ProductCategoryEntity;

  

  @ManyToOne(() => OrderCategoryEntity)
  @JoinColumn()
  orderCategory: OrderCategoryEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
