import * as recordAPI from "./records-api";

export async function createRecord(stoolData) {
  const data = await recordAPI.createRecord(stoolData);
  return data;
}

export async function findUserRecords() {
  const data = await recordAPI.findUserRecords();
  return data;
}

export async function getRecords(userId) {
  const data = await recordAPI.getRecords(userId);
  return data;
}

export async function deleteRecord(recordId) {
  const data = await recordAPI.deleteRecord(recordId);
  return data;
}

export async function editRecord(editedData, recordId) {
  const data = await recordAPI.editRecord(editedData, recordId);
  return data;
}
