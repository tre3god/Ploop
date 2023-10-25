import sendRequest from "./send-request";
const BASE_URL = "/api/records";

const createRecord = (stoolData) => {
  return sendRequest(BASE_URL, "POST", stoolData);
};

const findUserRecords = async () => {
  return sendRequest(`${BASE_URL}`);
};

const getRecords = async (userId) => {
  return sendRequest(`${BASE_URL}`);
};

const deleteRecord = async (recordId) => {
  return sendRequest(`${BASE_URL}/${recordId}`);
};

export { createRecord, findUserRecords, getRecords, deleteRecord };
