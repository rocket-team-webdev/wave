import { API } from "../constants/routes";

const axios = require("axios").default;

export function makePlaylistApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.PLAYLISTS}`,
  });
}

export async function getAllPlaylists(api = makePlaylistApi()) {
  return api.get("");
}
