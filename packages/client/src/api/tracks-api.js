import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeTrackApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.TRACKS}`,
  });
}

export async function getAllTracks(page = 0, limit = 5, api = makeTrackApi()) {
  const token = await getCurrentUserToken();
  return api.get(`?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTrackById(trackId, api = makeTrackApi()) {
  const token = await getCurrentUserToken();
  return api.get(`/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateTrackById(data, api = makeTrackApi()) {
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

export async function uploadTrack(file = {}, api = makeTrackApi()) {
  const token = await getCurrentUserToken();
  return api.post(``, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}

export async function deleteTrack(songId, api = makeTrackApi()) {
  const token = await getCurrentUserToken();
  return api.delete(`/${songId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function likeTrack(songId, api = makeTrackApi()) {
  const token = await getCurrentUserToken();
  return api.put(
    `/${songId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
