const db = require("../models");

async function getAlbums(req, res, next) {
  try {
    const { email } = req.user;
    const user = await db.User.findOne({ email });

    const albums = await db.Album.find({ userId: user._id });

    res.status(200).send({ albums });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

module.exports = {
  getAlbums,
};
