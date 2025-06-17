import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { DeliverType } from "../enums/DeliverType";
import { BaseEntity } from "./Base";

@Entity({
  name: "customer",
})
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ default: DeliverType.SELF })
  deliver: DeliverType;

  @Column()
  level: number;

  @Column()
  discount: number;

  @Column()
  template: number;

  @Column()
  no: string;

  @Column()
  desc: string;

  @Column({
    type: "float",
    default: 0,
  })
  balance?: number;

  @Column({
    nullable: true,
  })
  companyId?: number;

  @Column({
    nullable: true,
  })
  userId?: number;

  @Column({
    nullable: true,
    default: 0,
  })
  paytime?: number;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
