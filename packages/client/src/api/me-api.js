import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeMeApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.ME}`,
  });
}

// -----
// Users
// -----

export async function getMyFollowers(api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.FOLLOWERS}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getMyFollowings(page = 0, limit = 4, api = makeMeApi()) {
  const token = await getCurrentUserToken();

  return api.get(`${API.FOLLOWING}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---------
// Playlists
// ---------

export async function getMyPlaylists(
  page = 0,
  limit = 4,
  isContextualMenu = false,
  api = makeMeApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(
    `${API.PLAYLISTS}?page=${page}&limit=${limit}&isContextualMenu=${isContextualMenu}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

export async function getFollowingPlaylists(
  page = 0,
  limit = 4,
  api = makeMeApi(),
) {
  const token = await getCurrentUserToken();

  return api.get(
    `${API.PLAYLISTS}${API.FOLLOWING}?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

// ------
// Albums
// ------

export async function getMyAlbums(page = 0, limit = 5, api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.ALBUM}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getLikedAlbums(page = 0, limit = 5, api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.ALBUM}${API.LIKED}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ------
// Tracks
// ------

export async function getMyTracks(page = 0, limit = 5, api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.TRACKS}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getLikedTracks(page = 0, limit = 5, api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.TRACKS}${API.LIKED}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getTrack(id, api = makeMeApi()) {
  const token = await getCurrentUserToken();

  return api.get(`${API.TRACKS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
