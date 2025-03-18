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
import { ProductEntity } from "./Product";
import { TemplateCategoryEntity } from "./TemplateCategory";

@Entity({
  name: "template_category_product",
})
export class TemplateCategoryProductEntity extends BaseEntity<TemplateCategoryProductEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TemplateCategoryEntity)
  @JoinColumn()
  templateCategory: TemplateCategoryEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @Column({
    nullable: true,
  })
  templateId?: number;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: 0,
  })
  count: number;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
