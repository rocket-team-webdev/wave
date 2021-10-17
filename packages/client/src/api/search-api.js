import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeSearchApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.SEARCH}`,
  });
}

export async function searchTrack(
  search,
  page = 0,
  limit = 4,
  api = makeSearchApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`${API.TRACKS}/?q=${search}&page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function searchPlaylists(
  search,
  page = 0,
  limit = 4,
  api = makeSearchApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`${API.PLAYLISTS}/?q=${search}&page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function searchAlbum(
  search,
  page = 0,
  limit = 5,
  api = makeSearchApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`${API.ALBUM}/?q=${search}&page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function searchUser(
  search,
  page = 0,
  limit = 4,
  api = makeSearchApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`${API.USERS}/?q=${search}&page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
