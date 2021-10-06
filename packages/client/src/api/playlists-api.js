import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makePlaylistApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.PLAYLISTS}`,
  });
}

export async function getPlaylistById(playlistId, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();

  return api.get(`/${playlistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getAllPlaylists(
  page = 0,
  limit = 4,
  api = makePlaylistApi(),
) {
  const token = await getCurrentUserToken();

  return api.get(`?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function likePlaylist(playlistId, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();
  return api.put(
    `/${playlistId}/follow`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
