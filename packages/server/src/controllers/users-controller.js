const db = require("../models");

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.User.findOne(
      { _id: id },
      { firstName: 1, lastName: 1, profilePicture: 1 },
    );

    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

// -----
// Users
// -----
async function getAllUsers(req, res, next) {
  try {
    const { page = 0, limit = 5 } = req.query;
    const topUsers = await db.User.aggregate([
      { $match: {} },
      {
        $project: {
          firstName: 1,
          follows: { $size: "$followedBy" },
        },
      },
      { $sort: { follows: -1 } },
    ])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ users: topUsers });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getUserFollowers(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 0, limit = 5 } = req.query;

    const followers = await db.User.find({ _id: id }, { followedBy: 1, _id: 0 })
      .populate({
        path: "followedBy",
        options: {
          select: "_id firstName",
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    const followersUserArray = followers[0].followedBy;

    res.status(200).send({ data: followersUserArray });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getUserFollowings(req, res, next) {
  try {
    const { id } = req.params;
    const { page = 0, limit = 5 } = req.query;

    const following = await db.User.find({ _id: id }, { following: 1, _id: 0 })
      .populate({
        path: "following",
        options: {
          select: "_id firstName",
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    const followingUserArray = following[0].following;

    res.status(200).send({ data: followingUserArray });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

// ---------
// Playlists
// ---------

async function getUserPlaylists(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 3 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const playlists = await db.Playlist.find(
      {
        userId: id,
        isDeleted: false,
        publicAccessible: true,
      },
      {
        name: 1,
        primaryColor: 1,
        thumbnail: 1,
        userId: 1,
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        follows: { $size: "$followedBy" },
      },
    )
      .sort({ follows: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: playlists,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getUserFollowingPlaylists(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 3 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const followingPlaylists = await db.Playlist.find(
      { followedBy: id, isDeleted: false, publicAccessible: true },
      {
        name: 1,
        primaryColor: 1,
        thumbnail: 1,
        userId: 1,
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        follows: { $size: "$followedBy" },
      },
    )
      .sort({ follows: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: followingPlaylists,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

// ------
// Albums
// ------

async function getUserAlbums(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 4 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const albums = await db.Album.find(
      { userId: id },
      {
        title: 1,
        totalTracks: 1,
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        thumbnail: 1,
        year: 1,
      },
    )
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      albums,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getUserLikedAlbums(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 4 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const likedAlbums = await db.Album.find(
      { likedBy: id },
      {
        title: 1,
        totalTracks: 1,
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        thumbnail: 1,
        year: 1,
      },
    )
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      likedAlbums,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

// ------
// Tracks
// ------

async function getUserTracks(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const tracks = await db.Track.find(
      { userId: id },
      {
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
    )
      .populate({
        path: "album",
        options: {
          select: "title thumbnail",
        },
      })
      .sort({ popularity: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: tracks,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getUserLikedTracks(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const tracks = await db.Track.find(
      { likedBy: id },
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
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
        },
      })
      .sort({ popularity: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: tracks,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  getUserFollowers,
  getUserFollowings,
  getUserPlaylists,
  getUserFollowingPlaylists,
  getUserAlbums,
  getUserTracks,
  getUserLikedTracks,
  getUserLikedAlbums,
};
