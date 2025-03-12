import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";

import { BaseEntity } from "./Base";
import { TemplateCategoryEntity } from "./TemplateCategory";

@Entity({
  name: "template",
})
export class TemplateEntity extends BaseEntity<TemplateEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  status: number;

  // @ManyToMany(() => TemplateCategoryEntity, (category) => category.template)
  // categories: TemplateCategoryEntity[];

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
