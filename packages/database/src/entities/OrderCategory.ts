import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from "typeorm";

import { BaseEntity } from "./Base";
import { OrderProductEntity } from "./OrderProduct";
import { ProductCategoryEntity } from "./ProductCategory";

@Entity({
  name: "order_category",
})
export class OrderCategoryEntity extends BaseEntity<OrderCategoryEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: "",
  })
  name: string;

  @Column({
    nullable: true,
  })
  orderId?: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn()
  category: ProductCategoryEntity;

  products?: OrderProductEntity[];

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
