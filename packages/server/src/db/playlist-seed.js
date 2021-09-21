const db = require("../models");

async function getSeedPlaylist() {
  let { _id: userId } = await db.User.findOne({}, { _id: 1 }).lean();
  let { _id: trackId } = await db.Track.findOne({}, { _id: 1 }).lean();
  return [
    {
      name: "PLaylist 1",
      userId: userId,
      tracks: [trackId],
      followedBy: [userId],
    },
  ];
}

module.exports = { getSeedPlaylist };
