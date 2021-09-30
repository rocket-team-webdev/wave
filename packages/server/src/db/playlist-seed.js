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
      thumbnail:
        "https://images.unsplash.com/photo-1632993952737-0c2897164db3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      collaborative: false,
      description: "The first playlist",
      publicAccessible: false,
      primaryColor: "#AA000B",
    },
    {
      name: "PLaylist 2",
      userId: userId,
      tracks: [trackId],
      followedBy: [userId],
      thumbnail:
        "https://images.unsplash.com/photo-1616927366799-d4cab1b7e545?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
      collaborative: false,
      description: "The second playlist",
      publicAccessible: false,
      primaryColor: "#000000",
    },
  ];
}

module.exports = { getSeedPlaylist };
