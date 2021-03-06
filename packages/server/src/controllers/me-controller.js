const db = require("../models");

async function getMyFollowers(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

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

    res.status(200).send({
      data: followersArray,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
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
        },
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    const followingUsersArray = followingUsers[0].following;

    res.status(200).send({
      data: followingUsersArray,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getMyPlaylists(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 4, isContextualMenu = false } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const projection = !isContextualMenu
      ? {
          name: 1,
          primaryColor: 1,
          thumbnail: 1,
          userId: 1,
          follows: { $size: "$followedBy" },
        }
      : {
          name: 1,
          primaryColor: 1,
          isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
          thumbnail: 1,
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
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getMyFollowingPlaylists(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 4 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const playlists = await db.Playlist.find(
      { followedBy: userId, isDeleted: false },
      {
        name: 1,
        primaryColor: 1,
        thumbnail: 1,
        userId: 1,
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        follows: { $size: "$followedBy" },
      },
    )
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

async function getMyTracks(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const tracks = await db.Track.find(
      { userId },
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

async function getMyLikedTracks(req, res, next) {
  try {
    const { email } = req.user;
    const { page = 0, limit = 5 } = req.query;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

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
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
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
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
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
