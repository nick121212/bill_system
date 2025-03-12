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
export class RoleEntity extends BaseEntity<RoleEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  desc: string;

  @Column()
  order: number;

  @Column()
  status: number;

  @ManyToMany(() => MenuEntity)
  @JoinTable()
  menus: MenuEntity[];

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
