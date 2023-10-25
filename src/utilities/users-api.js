import sendRequest from "./send-request";
const BASE_URL = "/api/users";

const postUserData = async (userData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Invalid Sign up");
  }
};

const postUserLogin = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Invalid Login");
  }
};

const checkToken = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/check-token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error();
  }
};

const addRecord = async (data) => {
  return sendRequest(`${BASE_URL}/addrecord`, "POST", data);
};

const deleteRecord = async (recordId, userId) => {
  return sendRequest(
    `${BASE_URL}/deleterecord/${recordId}/${userId}`,
    "DELETE"
  );
};

export { postUserData, postUserLogin, checkToken, addRecord, deleteRecord };
