import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeGenreApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.GENRE}`,
  });
}

export async function getGenres(api = makeGenreApi()) {
  const token = await getCurrentUserToken();
  return api.get(``, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
