const db = require("../models");

async function searchTrack(req, res, next) {
  try {
    const searchText = req.query?.q;
    const { page = 0, limit = 5 } = req.query;

    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    // const data = await db.Track.find(
    //   { userId: user._id, $text: { $search: searchText } },
    //   { score: { $meta: "textScore" } },
    // ).sort({ score: { $meta: "textScore" } });
    // .explain(true);

    const data = await db.Track.find(
      {
        $or: [
          { name: { $regex: searchText, $options: "i" } },
          { artist: { $regex: searchText, $options: "i" } },
        ],
      },
      {
        name: 1,
        artist: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        isOwner: { $eq: ["$userId", userId] },
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

    return res
      .status(200)
      .send({ message: "Successfully searched", tracks: data });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function searchPlaylist(req, res, next) {
  try {
    const searchText = req.query?.q;
    const { page = 0, limit = 5 } = req.query;

    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const data = await db.Playlist.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: searchText, $options: "i" } }],
          isDeleted: false,
        },
      },
      {
        $project: {
          name: 1,
          follows: { $size: "$followedBy" },
          isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
          primaryColor: 1,
          thumbnail: 1,
          userId: 1,
        },
      },
      { $sort: { follows: -1 } },
    ])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    return res
      .status(200)
      .send({ message: "Successfully searched", playlist: data });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function searchAlbum(req, res, next) {
  try {
    const searchText = req.query?.q;
    // const { page = 0, limit = 5 } = req.query;

    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const data = await db.Album.aggregate([
      {
        $match: {
          title: { $regex: searchText, $options: "i" },
        },
      },
      {
        $project: {
          title: 1,
          isLiked: { $setIsSubset: [[userId], "$likedBy"] },
          likes: { $size: "$likedBy" },
          thumbnail: 1,
          userId: 1,
        },
      },
      {
        $sort: { likes: -1 },
      },
    ]);
    // .skip(parseInt(page) * parseInt(limit))
    // .limit(parseInt(limit));

    return res
      .status(200)
      .send({ message: "Successfully searched", album: data });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function searchUser(req, res, next) {
  try {
    const searchText = req.query?.q;
    const { page = 0, limit = 5 } = req.query;

    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    // const data = await db.Track.find(
    //   { userId: user._id, $text: { $search: searchText } },
    //   { score: { $meta: "textScore" } },
    // ).sort({ score: { $meta: "textScore" } });
    // .explain(true);

    const data = await db.User.aggregate([
      {
        $match: {
          $or: [
            { firstName: { $regex: searchText, $options: "i" } },
            { lastName: { $regex: searchText, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          follows: { $size: "$followedBy" },
          isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
          profilePicture: 1,
          _id: 1,
        },
      },
      {
        $sort: {
          follows: -1,
        },
      },
    ])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    return res
      .status(200)
      .send({ message: "Successfully searched", users: data });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  searchTrack,
  searchPlaylist,
  searchAlbum,
  searchUser,
};
