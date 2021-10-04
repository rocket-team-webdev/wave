const db = require("../models");

async function searchTrack(req, res, next) {
  try {
    console.log("req.query", req.query);

    const searchText = req.query?.q;

    const { email } = req.user;

    const user = await db.User.findOne({ email }, { _id: 1 });

    // const data = await db.Track.find(
    //   { userId: user._id, $text: { $search: searchText } },
    //   { score: { $meta: "textScore" } },
    // ).sort({ score: { $meta: "textScore" } });
    // .explain(true);

    const data = await db.Track.find({
      userId: user._id,
      $or: [
        { name: { $regex: searchText, $options: "i" } },
        { artist: { $regex: searchText, $options: "i" } },
      ],
    }).populate({
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

module.exports = {
  searchTrack,
};
