import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeMeApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.ME}`,
  });
}

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
