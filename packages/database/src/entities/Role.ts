import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: "role",
})
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  desc: string;

  @Column()
  order: number;

  @Column()
  status: number;
}