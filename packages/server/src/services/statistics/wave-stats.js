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
  try {
    const { data } = await fetchListenedTracks();
    const tracksArray = data.data;

    await tracksArray.forEach(async (track) => {
      await db.Track.findOneAndUpdate(
        { _id: track.trackId },
        { popularity: track.total },
      ).catch(() => undefined);
    });
    await updateGenresPopularity();
  } catch (error) {
    console.error(error);
  }
}

async function updateGenresPopularity() {
  try {
    const genresArray = await db.Track.aggregate([
      {
        $group: {
          _id: "$genreId",
          totalPopularity: { $sum: "$popularity" },
        },
      },
    ]);
    await genresArray.forEach(async (genreElement) => {
      await db.Genre.findOneAndUpdate(
        { _id: genreElement._id },
        { popularity: genreElement.totalPopularity },
      );
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  updateListenedTracks,
  updateGenresPopularity,
};
