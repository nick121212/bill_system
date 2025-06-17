import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { ReportType } from "../enums/ReportType";
import { BaseEntity } from "./Base";
import { CompanyEntity } from "./Company";
import { UserEntity } from "./User";

@Entity({
  name: "report",
})
export class ReportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: ReportType;

  @Column()
  desc: string;

  @Column({
    nullable: true,
  })
  companyId?: number;

  @Column({
    nullable: true,
  })
  userId?: number;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn()
  company?: CompanyEntity | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user?: UserEntity | null;
}
