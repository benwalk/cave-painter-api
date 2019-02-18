const { find, filter } = require("lodash");
const orders = require("./exampleData");

const resolvers = {
  Query: {
    listOrders: () =>
      filter(orders, function(order) {
        return order.createdAt;
      }),
    listCustomers: () =>
      filter(orders, function(order) {
        return order.createdAt;
      })
  },
  Order: {
    customer(order) {
      return find(orders, { email: order.email, id: order.id });
    },
    lineItems(order) {
      return filter(orders, { id: order.id });
    }
  },
  Customer: {
    billingAddress(customer) {
      return {
        id: customer.id,
        name: customer.billingName,
        address1: customer.billingAddress1,
        address2: customer.billingAddress2,
        city: customer.billingCity,
        state: customer.billingProvince,
        zip: customer.billingZip,
        country: customer.billingCountry,
        phone: customer.billingPhone
      };
    },
    shippingAddress(customer) {
      return {
        id: customer.id,
        name: customer.shippingName,
        address1: customer.shippingAddress1,
        address2: customer.shippingAddress2,
        city: customer.shippingCity,
        state: customer.shippingProvince,
        zip: customer.shippingZip,
        country: customer.shippingCountry,
        phone: customer.shippingPhone
      };
    }
  },
  LineItem: {
    name: order => order.lineItemName,
    price: order => order.lineItemPrice,
    sku: order => order.lineItemSku,
    variant: order => order.lineItemVariant,
    quantity: order => order.lineItemQuantity,
    requiresShipping: order => order.lineItemRequiresShipping === "TRUE",
    taxable: order => order.lineItemTaxable === "TRUE",
    fulfillmentStatus: order => order.lineItemFulfillmentStatus
  }
};

module.exports = { resolvers };
