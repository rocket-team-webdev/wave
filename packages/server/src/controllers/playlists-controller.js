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

async function getPlaylist(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 0, limit = 5 } = req.query;

    const playlist = await db.Playlist.findOne(
      { _id: id },
      {
        name: 1,
        artist: 1,
        // likes: { $size: "$likedBy" },
        // isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        popularity: 1,
        color: 1,
        // released: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        duration: 1,
        url: 1,
      },
    )
      .populate("tracks")
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ data: playlist.tracks });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  getPlaylists,
  getPlaylist,
};
