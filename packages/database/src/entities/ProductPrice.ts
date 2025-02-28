import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { CustomerEntity } from "./Customer";
import { ProductEntity } from "./Product";
import { BaseEntity } from "./Base";

@Entity({
  name: "product_price",
})
export class ProductPriceEntity extends BaseEntity<ProductPriceEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @OneToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @OneToOne(() => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
