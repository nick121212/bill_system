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

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  count: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => OrderCategoryEntity)
  @JoinColumn()
  orderCategory: OrderCategoryEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
