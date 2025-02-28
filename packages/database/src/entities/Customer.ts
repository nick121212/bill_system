import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { DeliverType } from "@/enums/DeliverType";

import { BaseEntity } from "./Base";

@Entity({
  name: "customer",
})
export class CustomerEntity extends BaseEntity<CustomerEntity> {
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

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
