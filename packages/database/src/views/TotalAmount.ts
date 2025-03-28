import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
        select \`order\`.\`customerId\`, \`order\`.\`companyId\`, \`customer\`.\`fullname\`, sum(\`products\`.\`totalPrice\`) as \`totalAmount\`
          from order_entity as \`order\`
          inner join customer as \`customer\` on \`order\`.\`customerId\` = \`customer\`.\`id\`
          inner join order_category as \`category\` on \`order\`.\`id\` = \`category\`.\`orderId\`
          inner join order_products as \`products\` on \`category\`.\`id\` = \`products\`.\`orderCategoryId\`
          where \`order\`.\`delete_time\` is NULL
          group by \`order\`.\`customerId\`,\`order\`.\`companyId\`
    `,
})
export class TotalAmountView {
  @ViewColumn()
  customerId: number;

  @ViewColumn()
  companyId: number;

  @ViewColumn()
  fullname: string;

  @ViewColumn({
    transformer: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  })
  totalAmount: number;
}
