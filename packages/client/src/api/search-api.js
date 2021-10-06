import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeSearchApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.SEARCH}`,
  });
}

export async function searchTrack(search, api = makeSearchApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.TRACKS}/?q=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
