import { ViewEntity, ViewColumn } from "typeorm";

import { OrderStatus } from "../enums/OrderStatus";

@ViewEntity({
  expression: `
        select \`order\`.\`customerId\`, 
          \`order\`.\`companyId\`, 
          \`customer\`.\`fullname\`, 
          \`order\`.\`status\`, 
          \`order\`.\`no\`, 
          \`order\`.\`create_time\` as \`createTime\`,
          \`products\`.\`totalPrice\`
          from order_entity as \`order\`
          inner join customer as \`customer\` on \`order\`.\`customerId\` = \`customer\`.\`id\`
          inner join order_category as \`category\` on \`order\`.\`id\` = \`category\`.\`orderId\`
          inner join order_products as \`products\` on \`category\`.\`id\` = \`products\`.\`orderCategoryId\`
          where \`order\`.\`delete_time\` is NULL
    `,
})
export class TotalAmountView {
  @ViewColumn()
  no: string;

  @ViewColumn()
  customerId: number;

  @ViewColumn()
  companyId: number;

  @ViewColumn()
  fullname: string;

  @ViewColumn()
  createTime: Date;

  @ViewColumn()
  totalPrice: number;

  @ViewColumn()
  status: OrderStatus;

  totalAmount: number;

  totalCount: number;

  customerCount: number;
}
