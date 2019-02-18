import * as dynamoDbLib from "../../../libs/dynamodb";
import { success, failure } from "../../../libs/response";

// export async function main(event, context) {
export async function hook(request, context) {
  console.log("hooked");
  // console.log(event);
  const event_json = JSON.parse(request.body);
  const order = event_json.data.object;
  console.log(order);

  const params = {
    TableName: process.env.tableName,
    Item: {
      id: order.id,
      created: order.created,
      amount: order.amount,
      customer: order.customer,
      email: order.email,
      items: order.items,
      shipping: order.shipping
    }
  };

  console.log(params);

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({
      status: failure,
      reason: e
    });
  }
}
