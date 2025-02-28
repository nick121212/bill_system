import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { PermissionType } from "@/enums/PermissionType";

@Entity({
  name: "menu",
})
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parentId: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  type: PermissionType;

  @Column()
  route: string;

  @Column()
  order: number;
}
