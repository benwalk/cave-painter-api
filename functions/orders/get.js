import * as dynamoDbLib from "../../libs/dynamodb";
import { success, failure } from "../../libs/response";

export async function main(firstName, context) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      // orderId: event.pathParameters.id
      firstName
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item.id);
    } else {
      // return failure({ status: false, error: "Item not found." });
      return success(firstName);
    }
  } catch (e) {
    return failure({ status: false, error: "Unknown Exception" });
  }
}
