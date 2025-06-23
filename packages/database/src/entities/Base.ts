import {
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export class BaseEntity extends TypeORMBaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  extend(partial: Partial<this>): this {
    Object.assign(this, partial);

    return this;
  }
}
