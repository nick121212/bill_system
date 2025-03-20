import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { OrderStatus } from "../enums/OrderStatus";
import { BaseEntity } from "./Base";
import { CustomerEntity } from "./Customer";

@Entity({
  name: "order",
})
export class OrderEntity extends BaseEntity<OrderEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  @Column()
  desc: string;

  @Column()
  totalPrice: number;

  @Column()
  discount: number;

  @Column({
    nullable: true,
  })
  companyId?: number;

  @Column({
    nullable: true,
  })
  userId?: number;

  @Column()
  status: OrderStatus;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;
}
