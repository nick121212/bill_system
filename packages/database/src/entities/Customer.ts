import { DeliverType } from "@/enums/DeliverType";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "customer",
})
export class CustomerEntity {
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
}
