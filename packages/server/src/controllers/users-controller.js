const db = require("../models");

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({ _id: id }, { firstName: 1 });

    res.status(200).send({ data: user });
  } catch (err) {
    res.status(500).send({ error: err });
    next(err);
  }
}

// ---------
// Playlists
// ---------

async function getUserPlaylists(req, res, next) {
  try {
    const { id } = req.params;
    // const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 4 } = req.query;
    const playlists = await db.Playlist.find(
      { userId: id, isDeleted: false },
      {
        name: 1,
        // collaborative: 1,
        // description: 1,
        primaryColor: 1,
        thumbnail: 1,
        // publicAccessible: 1,
        userId: 1,
        // tracks: 1,
        isFollowed: { $setIsSubset: [[id], "$followedBy"] },
        follows: { $size: "$followedBy" },
      },
    )
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: playlists,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function getUserFollowingPlaylists(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 0, limit = 4 } = req.query;
    const followingPlaylists = await db.Playlist.find(
      { followedBy: id, isDeleted: false },
      {
        name: 1,
        // collaborative: 1,
        // description: 1,
        primaryColor: 1,
        thumbnail: 1,
        // publicAccessible: 1,
        userId: 1,
        // tracks: 1,
        isFollowed: { $setIsSubset: [[id], "$followedBy"] },
        follows: { $size: "$followedBy" },
      },
    )
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: followingPlaylists,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

// ------
// Tracks
// ------

async function getUserTracks(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 0, limit = 5 } = req.query;

    const tracks = await db.Track.find(
      { userId: id },
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[id], "$likedBy"] },
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
      .populate({
        path: "album",
        options: {
          select: "title thumbnail",
          // sort: { created: -1},
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: tracks,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function getUserLikedTracks(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 0, limit = 4 } = req.query;

    const tracks = await db.Track.find(
      { likedBy: id },
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[id], "$likedBy"] },
        popularity: 1,
        color: 1,
        released: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        duration: 1,
        url: 1,
      },
    )
      .populate({
        path: "album",
        options: {
          select: "title thumbnail",
          // sort: { created: -1},
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: tracks,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

module.exports = {
  getUserById: getUserById,
  getUserPlaylists: getUserPlaylists,
  getUserFollowingPlaylists: getUserFollowingPlaylists,
  getUserTracks: getUserTracks,
  getUserLikedTracks: getUserLikedTracks,
};
