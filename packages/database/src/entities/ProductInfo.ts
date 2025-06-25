import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "./Base";

@Entity({
  name: "product_info",
})
export class ProductInfoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock: number;
}
