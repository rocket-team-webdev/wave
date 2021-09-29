const db = require("../models");

async function getMyTracks(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const tracks = await db.Track.find(
      { userId },
      {
        likes: { $size: "$likedBy" },
        name: 1,
        rating: 1,
        popularity: 1,
        color: 1,
        released: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        duration: 1,
        url: 1,
      },
    ).populate("album", "title  thumbnail");

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

    const tracks = await db.Track.find(
      { likedBy: userId },
      {
        likes: { $size: "$likedBy" },
        name: 1,
        rating: 1,
        popularity: 1,
        color: 1,
        released: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        duration: 1,
        url: 1,
      },
    ).populate("album", "title  thumbnail");

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
  getMyTracks: getMyTracks,
  getMyLikedTracks: getMyLikedTracks,
};
