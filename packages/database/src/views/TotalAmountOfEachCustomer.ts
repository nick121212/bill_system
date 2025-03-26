import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
        select "order"."customerId","customer"."fullname", sum("products"."totalPrice") from order_entity as "order"
        inner join customer as "customer" on "order"."customerId" = "customer"."id"
        inner join order_category as "category" on "order"."id" = "category"."orderId"
        inner join order_products as "products" on "category"."id" = "products"."orderCategoryId"
        where "order"."companyId" = 10 and "order"."delete_time" is NULL
        group by "order"."customerId"
    `,
})
export class TotalAmountOfEachCustomer {
  @ViewColumn()
  customerId: number;

  @ViewColumn()
  totalAmount: number;

  @ViewColumn()
  fullname: string;
}
