import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makePlaylistApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.PLAYLISTS}`,
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

export async function getPlaylistById(playlistId, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();

  return api.get(`/${playlistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updatePlaylistById(data = {}, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();
  return api.put(
    ``,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function addPlaylist(data = {}, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();

  return api.post(``, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}

export async function deletePlaylist(playlistId, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();
  return api.delete(`/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function followPlaylist(playlistId, api = makePlaylistApi()) {
  const token = await getCurrentUserToken();
  return api.put(
    `/${playlistId}/follow`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

export async function addTrackToPlaylist(
  playlistId,
  trackId,
  api = makePlaylistApi(),
) {
  const token = await getCurrentUserToken();

  return api.post(
    `${API.ADD_TRACK}`,
    { playlistId, trackId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function deleteTrackFromPlaylist(
  playlistId,
  trackId,
  api = makePlaylistApi(),
) {
  const token = await getCurrentUserToken();

  return api.delete(
    `${API.REMOVE_TRACK}`,
    { playlistId, trackId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
