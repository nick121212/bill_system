import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from "typeorm";

import { BaseEntity } from "./Base";
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

  @IsNotEmpty()
  @Column()
  company: string;

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

  @ManyToOne(() => RoleEntity)
  role: RoleEntity;

  @Column()
  roleId: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "datetime", default: Date.now() })
  validateDate: Date;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
