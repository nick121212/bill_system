import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
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

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
