import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "product_category",
})
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  desc: string;
}
