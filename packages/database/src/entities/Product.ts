import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { BaseEntity } from "./Base";
import { ProductPriceEntity } from "./ProductPrice";
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

  @Column({
    type: "float"
  })
  price: number;

  @Column({
    type: "float"
  })
  cost: number;

  @Column({
    nullable: true,
  })
  companyId?: number;

  @Column({
    nullable: true,
  })
  userId?: number;

  // @ManyToOne(() => ProductCategoryEntity)
  // @JoinTable()
  // category: ProductCategoryEntity;

  @ManyToOne(() => ProductUnitEntity)
  @JoinColumn()
  unit: ProductUnitEntity;

  @OneToMany(() => ProductPriceEntity, (photo) => photo.product)
  @JoinColumn()
  customerPrices?: ProductPriceEntity[];

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
