import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

import { BaseEntity } from "./Base";

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

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
