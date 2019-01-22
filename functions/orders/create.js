import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb";
import { success, failure } from "../../libs/response";

// export async function main(event, context) {
export async function main(firstName, nickname) {
  // const data = JSON.parse(event.body);
  // const params = {
  //   TableName: "notes",
  //   Item: {
  //     userId: event.requestContext.identity.cognitoIdentityId,
  //     noteId: uuid.v1(),
  //     content: data.content,
  //     attachment: data.attachment,
  //     createdAt: Date.now()
  //   }
  const params = {
    TableName: process.env.tableName,
    Key: { firstName },
    UpdateExpression: 'SET nickname = :nickname',
    ExpressionAttributeValues: {
      ':nickname': nickname
    }
  };

  try {
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
