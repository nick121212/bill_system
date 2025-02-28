import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

import { BaseEntity } from "./Base";

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

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
