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

import { OrderStatus } from "../enums/OrderStatus";
import { BaseEntity } from "./Base";
import { CustomerEntity } from "./Customer";

/**
 * 订单实体类
 * @description 用于存储和管理订单相关信息的实体类
 * @class OrderEntity
 * @extends {BaseEntity<OrderEntity>}
 */
@Entity({})
export class OrderEntity extends BaseEntity<OrderEntity> {
  /**
   * 订单唯一标识符
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  no?: string;

  /**
   * 订单关联的客户信息
   * @type {CustomerEntity}
   */
  @ManyToOne(() => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  /**
   * 订单描述
   * @type {string}
   */
  @Column()
  desc: string;

  /**
   * 订单总价
   * @type {number}
   */
  @Column()
  totalPrice: number;

  /**
   * 订单折扣金额
   * @type {number}
   */
  @Column()
  discount: number;

  /**
   * 关联的公司ID
   * @type {number}
   * @optional
   */
  @Column({
    nullable: true,
  })
  companyId?: number;

  /**
   * 关联的用户ID
   * @type {number}
   * @optional
   */
  @Column({
    nullable: true,
  })
  userId?: number;

  /**
   * 订单状态
   * @type {OrderStatus}
   * @description 订单的当前状态
   * - OrderStatus.UNPAID: 未支付
   * - OrderStatus.PAID: 已支付
   * - OrderStatus.CANCELLED: 已取消
   */
  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.UNPAYED,
  })
  status: OrderStatus;

  @CreateDateColumn({ type: "datetime", name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ type: "datetime", name: "update_time" })
  updateTime: Date;

  /**
   * 软删除时间
   * @type {Date}
   * @description 记录删除时间，为null表示未删除
   */
  @DeleteDateColumn({ type: "datetime", name: "delete_time" })
  deleteTime: Date;
}
