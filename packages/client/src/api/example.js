import { API } from "../constants/routes";
import { getCurrentUserToken } from "../services/auth";

const axios = require("axios").default;

export function makeUploadApi() {
  return axios.create({
    baseURL: `${API.MAIN}/track`,
  });
}

export async function uploadCover(file = {}, api = makeUploadApi()) {
  const token = await getCurrentUserToken();
  console.log("api", file);

  return api.post(`/upload`, file, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": `multipart/form-data; boundary="MyBoundary"`,
      "Content-Type": `multipart/form-data"`,
    },
  });
}
