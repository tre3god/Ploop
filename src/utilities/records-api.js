import sendRequest from "./send-request";
const BASE_URL = "/api/records";

const createRecord = (stoolData) => {
  return sendRequest(BASE_URL, "POST", stoolData);
};

const findUserRecords = async () => {
  return sendRequest(`${BASE_URL}`);
};

export { createRecord, findUserRecords };
