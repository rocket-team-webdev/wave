import { isMobile } from "react-device-detect";
import { STATS_API } from "../constants/routes";
import { STATS_SERVER_API_KEY } from "./config/api-keys";

const axios = require("axios").default;

export function makePlaybackApi() {
  return axios.create({
    baseURL: `${STATS_API.MAIN}${STATS_API.PLAYBACKS}`,
  });
}

export async function saveListened(trackId, userId, api = makePlaybackApi()) {
  return api.post(
    ``,
    {
      agent: isMobile ? "mobile" : "web",
      trackId: trackId,
      userId: userId,
    },
    {
      headers: {
        "x-api-token": STATS_SERVER_API_KEY,
      },
    },
  );
}
