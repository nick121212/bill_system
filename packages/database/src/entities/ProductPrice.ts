import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { CustomerEntity } from "./Customer";
import { ProductEntity } from "./Product";

@Entity({
  name: "product_price",
})
export class ProductPriceEntity {
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
}
