import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeAccountApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.ACCOUNT}`,
  });
}

export function makeRegisterApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.REGISTER}`,
  });
}

export function signInUserData(token) {
  return axios.get(`${API.MAIN}${API.AUTHENTICATE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getAccount(api = makeAccountApi()) {
  const token = await getCurrentUserToken();
  return api.get(``, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// export async function updateAccount(data, api = makeAccountApi()) {
//   const token = await getCurrentUserToken();
//   return api.post(
//     ``,
//     { ...data },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     },
//   );
// }

export async function updateAccount(file = {}, api = makeAccountApi()) {
  const token = await getCurrentUserToken();

  return api.post(``, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}

export async function deleteAccount(api = makeAccountApi()) {
  const token = await getCurrentUserToken();
  return api.delete(``, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createClient(file = {}, api = makeRegisterApi()) {
  const token = await getCurrentUserToken();

  return api.post(``, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}
