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
      // "Content-Type": `multipart/form-data; boundary="MyBoundary"`,
      "Content-Type": `multipart/form-data"`,
    },
  });
  // return api.post(
  //   ``,
  //   {
  //     title: albumData.firstName,
  //     year: albumData.year,
  //     thumbnail: albumData.thumbnail,
  //   },
  //   {
  //     headers: { Authorization: `Bearer ${token}` },
  //   },
  // );
}
