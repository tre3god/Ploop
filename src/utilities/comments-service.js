import * as commentsAPI from "./comments-api";

export async function createComment(comment) {
  const data = await commentsAPI.createComment(comment);
  return data;
}

export async function getAllComments(recordId) {
  const data = await commentsAPI.getAllComments(recordId);
  return data;
}
