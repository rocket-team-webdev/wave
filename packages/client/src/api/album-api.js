import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeAlbumApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.ALBUM}`,
  });
}

export async function getUserAlbum(api = makeAlbumApi()) {
  const token = await getCurrentUserToken();
  return api.get(``, {
    headers: { Authorization: `Bearer ${token}` },
  });
}