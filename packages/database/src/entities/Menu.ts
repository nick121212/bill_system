import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
} from "typeorm";

import { PermissionType } from "@/enums/PermissionType";

import { BaseEntity } from "./Base";

@Entity({
  name: "menu",
})
@Tree("closure-table")
export class MenuEntity extends BaseEntity<MenuEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  type: PermissionType;

  @Column()
  route: string;

  @Column()
  order: number;

  @TreeChildren()
  children: MenuEntity[];

  @TreeParent()
  parent: MenuEntity;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
