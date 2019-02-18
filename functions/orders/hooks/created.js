import * as dynamoDbLib from "../../../libs/dynamodb";
import { success, failure } from "../../../libs/response";

// export async function main(event, context) {
export async function hook(event, context) {
  console.log("hooked");
  const data = JSON.parse(event.body);
  console.log("parsed");
  console.log(data);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      id: data.id,
      createdAt: data.created
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
