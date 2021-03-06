import uuid from "uuid";
import * as postgresLib from "./libs/postgres";

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "orders",
    Item: {
      id,
      email,
      financialStatus,
      paidAt,
      fulfillmentStatus,
      fulfilledAt,
      currency,
      subtotal,
      shippingCost,
      taxes,
      amount,
      refunded,
      total,
      discountCode,
      discountAmount,
      shippingMethod,
      createdAt,
      lineItemQuantity,
      lineItemName,
      lineItemPrice,
      lineItemSku,
      lineItemVariant,
      lineItemRequiresShipping,
      lineItemTaxable,
      lineItemFulfillmentStatus,
      billingName,
      billingAddress1,
      billingAddress2,
      billingCity,
      billingZip,
      billingProvince,
      billingCountry,
      billingPhone,
      shippingName,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingZip,
      shippingProvince,
      shippingCountry,
      shippingPhone,
      cancelledAt,
      privateNotes,
      paymentMethod,
      paymentReference,


      userId: event.requestContext.identity.cognitoIdentityId,
      createdAt: Date.now()
    }
  };

  dynamoDb.put(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
