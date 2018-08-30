import * as postgres from "./libs/postgres";
import { success, failure } from "./libs/responses";

export async function main(event, context, callback) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      reference: event.pathParameters.id
    }
  };

  try {
    const result = await postgres.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
