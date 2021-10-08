const db = require("../models");

async function searchTrack(req, res, next) {
  try {
    const searchText = req.query?.q;

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
    ).populate({
      path: "album",
      options: {
        select: "title thumbnail",
      },
    });

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

    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const data = await db.Playlist.find(
      {
        $or: [{ name: { $regex: searchText, $options: "i" } }],
        isDeleted: false,
      },
      {
        name: 1,
        follows: { $size: "$followedBy" },
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        primaryColor: 1,
        thumbnail: 1,
        userId: 1,
      },
    );

    return res
      .status(200)
      .send({ message: "Successfully searched", playlist: data });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  searchTrack,
  searchPlaylist,
};
