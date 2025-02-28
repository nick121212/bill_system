import { Max, Min } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { BaseEntity } from "./Base";
import { CustomerEntity } from "./Customer";
import { ProductEntity } from "./Product";

@Entity({
  name: "product_price",
})
export class ProductPriceEntity extends BaseEntity<ProductPriceEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Min(10)
  @Max(100)
  @Column({ default: 100 })
  discount: number;

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
