import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "product_unit",
})
export class ProductUnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  desc: string;
}
