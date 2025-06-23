import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { ChargeType } from "../enums/ChargeType";
import { BaseEntity } from "./Base";
import { CustomerEntity } from "./Customer";
import { UserEntity } from "./User";

@Entity({
  name: "charges",
})
export class ChargeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({
    type: "float",
    default: 0,
  })
  balance?: number;

  @Column({
    nullable: true,
  })
  customerId?: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn()
  customer?: CustomerEntity;

  @Column({
    type: "float",
    default: 0,
  })
  extra?: number;

  @Column({
    type: "enum",
    enum: ChargeType,
    default: ChargeType.CHARGE,
  })
  type?: ChargeType;

  @Column({
    nullable: true,
  })
  companyId?: number;

  @Column({
    nullable: true,
  })
  userId?: number;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
