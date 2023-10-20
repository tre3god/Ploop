import * as recordAPI from "./records-api";

export async function createRecord(stoolData) {
  const data = await recordAPI.createRecord(stoolData);
  return data;
}

export async function findUserData() {
  const data = await recordAPI.findUserData();
  return data;
}
