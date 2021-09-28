import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function uploadTrackApi() {
  return axios.create({
    baseURL: `${API.MAIN}${API.UPLOAD}`,
  });
}

export async function uploadTrack(data, api = uploadTrackApi()) {
  const token = await getCurrentUserToken();
  return api.post(
    ``,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
