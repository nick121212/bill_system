import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { BaseEntity } from "./Base";
import { ProductEntity } from "./Product";
import { ProductCategoryEntity } from "./ProductCategory";
import { TemplateCategoryEntity } from "./TemplateCategory";

@Entity({
  name: "template_category_product",
})
export class TemplateCategoryProductEntity extends BaseEntity<TemplateCategoryProductEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TemplateCategoryEntity)
  @JoinColumn()
  templateCategory: TemplateCategoryEntity;

  @OneToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
