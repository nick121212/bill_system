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
/**
 * 模板分类产品关联表
 * 用于存储模板分类和产品之间的关联关系，包括产品价格和数量
 */
export class TemplateCategoryProductEntity extends BaseEntity<TemplateCategoryProductEntity> {
  /** 主键ID */
  @PrimaryGeneratedColumn()
  id: number;

  /** 关联的模板分类 */
  @ManyToOne(() => TemplateCategoryEntity)
  @JoinColumn()
  templateCategory: TemplateCategoryEntity;

  /** 关联的产品 */
  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  /** 模板ID（可选） */
  @Column({
    nullable: true,
  })
  templateId?: number;

  /** 产品价格 */
  @Column({
    type: "float",
    default: 0,
  })
  price: number;

  /** 产品数量 */
  @Column({
    default: 0,
  })
  count: number;

  /** 产品分数 */
  @Column({
    default: 0,
  })
  times: number;

  /** 创建时间 */
  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  /** 更新时间 */
  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
