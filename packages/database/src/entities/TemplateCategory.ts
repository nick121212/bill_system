import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
  // OneToMany,
} from "typeorm";

import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";

// import { TemplateEntity } from "./Template";

// import { TemplateEntity } from "./Template";

@Entity({
  name: "template_category",
})
export class TemplateCategoryEntity extends BaseEntity<TemplateCategoryEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: "",
  })
  name: string;

  @Column({
    nullable: true,
  })
  templateId?: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn()
  category: ProductCategoryEntity;

  // @ManyToMany(() => TemplateCategoryProductEntity)
  // @JoinColumn()
  // categoryProducts: TemplateCategoryProductEntity[];

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
