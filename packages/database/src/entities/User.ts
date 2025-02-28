import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { BaseEntity } from "./Base";

@Entity({
  name: "user",
})
export class UserEntity extends BaseEntity<UserEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  fullname: string;

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

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
