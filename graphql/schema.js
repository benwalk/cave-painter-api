const { gql }  = require('apollo-server-lambda');

const typeDefs = gql`
type Query {
  listOrders: [Order]!
  listCustomers: [Customer]!
  getOrder(id: String): Order

}

type Order {
  id: String!
  customer: Customer!
  lineItems: [LineItem]
  subtotal: Float
  discount: [Discount]
  taxes: Float
  shippingCost: Float
  amount: Float
  financialStatus: String
  paidAt: String
  paymentMethod: String
  paymentReference: String
  fulfillmentStatus: String
  fulfilledAt: String
  createdAt: String
  modifiedAt: String
  lineItemName: String
}

type Customer {
  id: String!
  email: String!
  billingAddress: Address
  shippingAddress: Address
}

type Address {
  id: String
  name: String
  address1: String
  address2: String
  city: String
  state: String
  zip: String
}

type LineItem {
  name: String
  price: Float
  sku: String
  variant: String
  quantity: Int
  requiresShipping: Boolean
  taxable: Boolean
  fulfillmentStatus: String
}

type Discount {
  id: String
  code: String
  amount: Float
}
`
module.exports = {typeDefs}
