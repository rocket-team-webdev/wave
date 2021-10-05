const db = require("../models");

async function getPlaylists(req, res, next) {
  try {
    const { page = 0, limit = 4 } = req.query;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const foundPlaylists = await db.Playlist.find(
      { $or: [{ publicAccessible: true }, { userId: userId }] },
      {
        name: 1,
        follows: { $size: "$followedBy" },
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        primaryColor: 1,
        thumbnail: 1,
        userId: 1,
      },
    )
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ playlists: foundPlaylists });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function getPlaylistById(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 5 } = req.query;

    const playlist = await db.Playlist.findOne(
      { _id: id },
      {
        name: 1,
        collaborative: 1,
        follows: { $size: "$followedBy" },
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        description: 1,
        primaryColor: 1,
        thumbnail: 1,
        publicAccessible: 1,
        userId: 1,
        tracks: 1,
      },
    )
      .populate({
        path: "tracks",
        select: {
          name: 1,
          artist: 1,
          likes: { $size: "$likedBy" },
          isLiked: { $setIsSubset: [[userId], "$likedBy"] },
          popularity: 1,
          color: 1,
          genreId: 1,
          userId: 1,
          album: 1,
          duration: 1,
          url: 1,
        },
        options: {
          skip: parseInt(page) * parseInt(limit),
          limit: parseInt(limit),
        },
        populate: [
          {
            path: "album",
            options: {
              select: "title thumbnail",
            },
          },
          {
            path: "genreId",
            options: {
              select: "name",
            },
          },
        ],
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ data: playlist });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  getPlaylists,
  getPlaylistById,
};
