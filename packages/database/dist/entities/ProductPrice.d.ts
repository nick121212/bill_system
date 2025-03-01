import { BaseEntity } from "./Base";
import { CustomerEntity } from "./Customer";
import { ProductEntity } from "./Product";
export declare class ProductPriceEntity extends BaseEntity<ProductPriceEntity> {
    id: number;
    price: number;
    discount: number;
    product: ProductEntity;
    customer: CustomerEntity;
    createTime: Date;
    updateTime: Date;
}
