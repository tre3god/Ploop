import sendRequest from "./send-request";
const BASE_URL = "/api/records";

const createRecord = (stoolData) => {
  return sendRequest(BASE_URL, "POST", stoolData);
};

const findUserRecords = async () => {
  return sendRequest(`${BASE_URL}`);
};

const getRecords = async () => {
  return sendRequest(`${BASE_URL}`);
};

const deleteRecord = async (recordId) => {
  return sendRequest(`${BASE_URL}/${recordId}`, "DELETE");
};

const editRecord = async (editedData, recordId) => {
  return sendRequest(`${BASE_URL}/${recordId}/edit`, "PATCH", editedData);
};

export { createRecord, findUserRecords, getRecords, deleteRecord, editRecord };
