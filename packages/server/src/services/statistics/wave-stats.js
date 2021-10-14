const axios = require("axios").default;
const { STATS_API } = require("./routes");
const { config } = require("../../config");
const db = require("../../models");

function makePlaybackApi() {
  return axios.create({
    baseURL: `${STATS_API.MAIN}${STATS_API.PLAYBACKS}`,
  });
}

function fetchListenedTracks(api = makePlaybackApi()) {
  return api.get(``, {
    headers: {
      "x-api-token": config.statsServer.key,
    },
  });
}

async function updateListenedTracks() {
  const { data } = await fetchListenedTracks();
  const tracksArray = data.data;
  console.log(tracksArray);
  await tracksArray.forEach(async (track) => {
    await db.Track.findOneAndUpdate(
      { _id: track.trackId },
      { popularity: track.total },
    );
  });
}

module.exports = {
  updateListenedTracks,
};
