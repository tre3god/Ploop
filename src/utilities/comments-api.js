import sendRequest from "./send-request";
const BASE_URL = "/api/comments";

const createComment = (comment) => {
  return sendRequest(`${BASE_URL}/addcomment`, "POST", comment);
};

export { createComment };
