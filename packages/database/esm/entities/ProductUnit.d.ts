import { BaseEntity } from "./Base";
export declare class ProductUnitEntity extends BaseEntity<ProductUnitEntity> {
    id: number;
    name: string;
    label: string;
    desc: string;
    createTime: Date;
    updateTime: Date;
}
