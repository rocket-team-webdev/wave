const db = require("../models");

async function upload(req, res, next) {
  const { firebaseId } = req.user;
  const data = await db.User.findOne({ firebaseId });

  try {
    //TODO: Mocking track file
    const fileStr = "";
    console.log(fileStr);

    res.status(200).send({ message: "User found", userId: data._id });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  upload,
};
