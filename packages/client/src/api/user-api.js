import { API } from "../constants/routes";

const axios = require("axios").default;

export function makeUserApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.USER}`,
  });
}

export async function getUserFollowers(api = makeUserApi()) {
  return api.get("/followers");
}

export async function getUserFollowings(api = makeUserApi()) {
  return api.get("/following");
}

export async function getUserPlaylists(api = makeUserApi()) {
  return api.get("/playlists");
}

export async function getFollowingPlaylists(api = makeUserApi()) {
  return api.get("/playlists/following");
}

export async function getPlaylists(id, api = makeUserApi()) {
  return api.get(`/playlists/following/${id}`);
}

export async function getUserTracks(api = makeUserApi()) {
  return api.get("/tracks");
}

export async function getUserLikedTracks(api = makeUserApi()) {
  return api.get("/tracks/liked");
}

export async function getTrack(id, api = makeUserApi()) {
  return api.get(`/tracks/${id}`);
}
