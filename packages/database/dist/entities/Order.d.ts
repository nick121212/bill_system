import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";
import { BaseEntity } from "./Base";
export declare class OrderEntity extends BaseEntity<OrderEntity> {
    id: number;
    name: string;
    label: string;
    desc: string;
    price: number;
    category: ProductCategoryEntity;
    unit: ProductUnitEntity;
    createTime: Date;
    updateTime: Date;
}
