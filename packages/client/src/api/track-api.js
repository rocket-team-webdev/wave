import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeTrackApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.TRACKS}`,
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
