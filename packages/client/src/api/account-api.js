import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

// export function makeAccountApi() {
//   return axios.create({
//     baseURL: `${API.MAIN}${API.ACCOUNT}`,
//   });
// }

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

// export function getAllProducts(api = makeAccountApi()) {
//   return api.get(``);
// }

// export async function getClient(clientId, api = makeAccountApi()) {
//   const token = await getCurrentUserToken();
//   return api.get(`/${clientId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }

export async function createClient(clientData, api = makeRegisterApi()) {
  const token = await getCurrentUserToken();
  return api.post(
    ``,
    {
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      username: clientData.username,
      country: clientData.country,
      birthDate: clientData.birthDate,
      profilePicture: clientData.profilePicture,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

// export async function updateClient(client, api = makeAccountApi()) {
//   const token = await getCurrentUserToken();
//   return api.post(
//     `/${client.id}`,
//     { client: client },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     },
//   );
// }

// export function removeProductById(productId, api = makeClientsApi()) {
//   return api.delete(`/${productId}`);
// }
