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

export async function addAlbum(file = {}, api = makeAlbumApi()) {
  const token = await getCurrentUserToken();

  return api.post(``, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}

export async function getAlbumById(albumId, api = makeAlbumApi()) {
  const token = await getCurrentUserToken();

  return api.get(`/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateAlbum(file = {}, api = makeAlbumApi()) {
  const token = await getCurrentUserToken();

  return api.put(``, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}

export async function deleteAlbum(api = makeAlbumApi()) {
  const token = await getCurrentUserToken();
  return api.delete(``, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function likeAlbum(albumId, api = makeAlbumApi()) {
  const token = await getCurrentUserToken();
  return api.put(
    `/${albumId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
