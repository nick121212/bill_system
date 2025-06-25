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
  OneToOne,
  Unique,
} from "typeorm";

import { BaseEntity } from "./Base";
import { ProductInfoEntity } from "./ProductInfo";
import { ProductPriceEntity } from "./ProductPrice";
import { ProductUnitEntity } from "./ProductUnit";

@Entity({
  name: "product",
})
@Unique(["sku"])
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: null,
  })
  sku?: string;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  desc: string;

  @Column({
    type: "float",
  })
  price: number;

  @Column({
    type: "float",
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

  @OneToOne(() => ProductInfoEntity)
  @JoinColumn()
  info?: ProductInfoEntity;

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
