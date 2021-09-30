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

export async function getMyFollowings(page = 0, limit = 10, api = makeMeApi()) {
  const token = await getCurrentUserToken();

  return api.get(`${API.FOLLOWING}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---------
// Playlists
// ---------

export async function getMyPlaylists(api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.PLAYLISTS}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getFollowingPlaylists(api = makeMeApi()) {
  const token = await getCurrentUserToken();

  return api.get(`${API.PLAYLISTS}${API.FOLLOWING}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getPlaylist(id, api = makeMeApi()) {
  const token = await getCurrentUserToken();

  return api.get(`${API.PLAYLISTS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ------
// Tracks
// ------

export async function getMyTracks(api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(API.TRACKS, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getLikedTracks(api = makeMeApi()) {
  const token = await getCurrentUserToken();
  return api.get(`${API.TRACKS}${API.LIKED}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getTrack(id, api = makeMeApi()) {
  const token = await getCurrentUserToken();

  return api.get(`${API.TRACKS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
