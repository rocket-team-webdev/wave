const db = require("../models");

async function getMyFollowers(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const { page = 0, limit = 5 } = req.query;

    const followers = await db.User.find(
      { _id: userId },
      { followedBy: 1, _id: 0 },
    )
      .populate({
        path: "followedBy",
        options: {
          select: "_id firstName",
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    const followersArray = followers[0].followedBy;

    console.log("Followers ------>", followersArray);
    res.status(200).send({
      data: followersArray,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function getMyFollowings(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 10 } = req.query;

    const followingUsers = await db.User.find(
      { email },
      {
        following: 1,
      },
    )
      .populate({
        path: "following",
        options: {
          select: "firstName",
          // sort: { created: -1},
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    const followingUsersArray = followingUsers[0].following;

    res.status(200).send({
      data: followingUsersArray,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function getMyPlaylists(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 4, isContextualMenu = false } = req.query;

    const projection = !isContextualMenu
      ? {
          name: 1,
          // collaborative: 1,
          // description: 1,
          primaryColor: 1,
          thumbnail: 1,
          // publicAccessible: 1,
          userId: 1,
          // tracks: 1,
          // isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
          follows: { $size: "$followedBy" },
        }
      : {
          name: 1,
        };
    const playlists = await db.Playlist.find(
      { userId: userId, isDeleted: false },
      projection,
    )
      .sort({ createdAt: -1 })
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

async function getMyFollowingPlaylists(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 4 } = req.query;

    const playlists = await db.Playlist.find(
      { followedBy: userId, isDeleted: false },
      {
        name: 1,
        // collaborative: 1,
        // description: 1,
        primaryColor: 1,
        thumbnail: 1,
        // publicAccessible: 1,
        userId: 1,
        // tracks: 1,
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
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

async function getMyTracks(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 5 } = req.query;

    const tracks = await db.Track.find(
      { userId },
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
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

async function getMyLikedTracks(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 5 } = req.query;

    const tracks = await db.Track.find(
      { likedBy: userId },
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
          // sort: { created: -1},
        },
      })
      .sort({ popularity: -1 })
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

async function getMyAlbums(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;

    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const albums = await db.Album.find(
      { userId: userId },
      {
        title: 1,
        totalTracks: 1,
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        thumbnail: 1,
        year: 1,
        likes: { $size: "$likedBy" },
      },
    )
      .sort({ likes: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: albums,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function getMyLikedAlbums(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;

    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const userLikedAlbums = await db.Album.find(
      { likedBy: userId },
      {
        title: 1,
        totalTracks: 1,
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        thumbnail: 1,
        year: 1,
        likes: { $size: "$likedBy" },
      },
    )
      .sort({ likes: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({
      data: userLikedAlbums,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

module.exports = {
  getMyFollowers,
  getMyFollowings,
  getMyPlaylists,
  getMyFollowingPlaylists,
  getMyTracks,
  getMyLikedTracks,
  getMyAlbums,
  getMyLikedAlbums,
};
