import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeGenreApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.GENRE}`,
  });
}

export async function getAllGenres(page = 0, limit = 10, api = makeGenreApi()) {
  const token = await getCurrentUserToken();
  return api.get(`?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
