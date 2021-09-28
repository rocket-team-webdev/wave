const db = require("../models");

async function getPlaylists(req, res, next) {
  try {
    const foundPlaylists = await db.Playlist.find({});
    res.status(200).send({ playlists: foundPlaylists });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  getPlaylists: getPlaylists,
};
