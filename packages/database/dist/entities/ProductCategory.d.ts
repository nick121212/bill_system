import { BaseEntity } from "./Base";
export declare class ProductCategoryEntity extends BaseEntity<ProductCategoryEntity> {
    id: number;
    name: string;
    label: string;
    desc: string;
    createTime: Date;
    updateTime: Date;
}
