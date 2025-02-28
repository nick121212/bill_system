import { CustomerEntity } from "./Customer";
import { ProductEntity } from "./Product";
import { BaseEntity } from "./Base";
export declare class ProductPriceEntity extends BaseEntity<ProductPriceEntity> {
    id: number;
    price: number;
    product: ProductEntity;
    customer: CustomerEntity;
    createTime: Date;
    updateTime: Date;
}
