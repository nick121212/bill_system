import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from "typeorm";

import { BaseEntity } from "./Base";
import { MenuEntity } from "./Menu";

@Entity({
  name: "role",
})
/**
 * 角色实体
 * 用于管理系统中的角色信息及其对应的权限菜单
 */
export class RoleEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn()
  id: number;

  /** 角色名称（英文） */
  @Column()
  name: string;

  /** 角色标签（中文名称） */
  @Column()
  label: string;

  /** 角色描述 */
  @Column()
  desc: string;

  /** 排序顺序 */
  @Column()
  order: number;

  /** 状态（0:禁用，1:启用） */
  @Column()
  status: number;

  /** 角色关联的菜单权限 */
  @ManyToMany(() => MenuEntity)
  @JoinTable()
  menus: MenuEntity[];

  /** 创建时间 */
  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  /** 更新时间 */
  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  /** 删除时间（软删除） */
  @DeleteDateColumn()
  deletedDate: Date;
}
