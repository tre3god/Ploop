import sendRequest from "./send-request";
const BASE_URL = "/api/records";

export function createRecord(stoolData) {
  return sendRequest(BASE_URL, "POST", stoolData);
}
