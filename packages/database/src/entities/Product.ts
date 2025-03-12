import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";

import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";

@Entity({
  name: "product",
})
export class ProductEntity extends BaseEntity<ProductEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  cost: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn()
  category: ProductCategoryEntity;

  @ManyToOne(() => ProductUnitEntity)
  @JoinColumn()
  unit: ProductUnitEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
