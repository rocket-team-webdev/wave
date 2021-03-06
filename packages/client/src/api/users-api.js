import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeUsersApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.USERS}`,
  });
}

export async function getUserById(id, api = makeUsersApi()) {
  const token = await getCurrentUserToken();
  return api.get(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// -----
// Users
// -----

export async function getAllUsers(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`/popular?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getUserFollowers(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`/${id}${API.FOLLOWERS}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getUserFollowings(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();

  return api.get(`/${id}${API.FOLLOWING}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function followUser(id, api = makeUsersApi()) {
  const token = await getCurrentUserToken();

  return api.post(
    `/${id}${API.FOLLOW}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

// ---------
// Playlists
// ---------

export async function getUserPlaylists(
  id,
  page = 0,
  limit = 3,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`/${id}${API.PLAYLISTS}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getUserFollowingPlaylists(
  id,
  page = 0,
  limit = 3,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(
    `/${id}${API.PLAYLISTS}${API.FOLLOWING}?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

// ------
// Albums
// ------

export async function getUserAlbums(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`/${id}${API.ALBUM}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getUserLikedAlbums(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`/${id}${API.ALBUM}${API.LIKED}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ------
// Tracks
// ------

export async function getUserTracks(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(`/${id}${API.TRACKS}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getUserLikedTracks(
  id,
  page = 0,
  limit = 5,
  api = makeUsersApi(),
) {
  const token = await getCurrentUserToken();
  return api.get(
    `/${id}${API.TRACKS}${API.LIKED}?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
