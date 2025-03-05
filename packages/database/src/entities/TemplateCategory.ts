import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";
import { TemplateEntity } from "./Template";

@Entity({
  name: "template_category",
})
export class TemplateCategoryEntity extends BaseEntity<TemplateCategoryEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TemplateEntity)
  @JoinColumn()
  template: TemplateEntity;

  @OneToOne(() => ProductCategoryEntity)
  @JoinColumn()
  category: ProductCategoryEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
