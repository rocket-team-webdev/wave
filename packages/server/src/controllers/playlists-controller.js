const db = require("../models");

async function getPlaylists(req, res, next) {
  try {
    const { page = 0, limit = 4 } = req.query;

    const foundPlaylists = await db.Playlist.find({})
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ playlists: foundPlaylists });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  getPlaylists: getPlaylists,
};
