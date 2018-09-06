import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb";
import { success, failure } from "./libs/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "dev-coffees",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      id: uuid.v1(),
      name: data.name,
      description: data.description,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
