import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";

import { BaseEntity } from "./Base";
import { CompanyEntity } from "./Company";
import type { MenuEntity } from "./Menu";
import { RoleEntity } from "./Role";

@Entity({
  name: "user",
})
@Unique(["email", "fullname"])
export class UserEntity extends BaseEntity<UserEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  fullname: string;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn()
  company?: CompanyEntity;

  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Exclude()
  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => RoleEntity)
  role?: RoleEntity;

  @Column({ default: true })
  isActive: boolean;

  permissions?: MenuEntity[];

  @Column({ default: 30 })
  validateDate?: number;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
