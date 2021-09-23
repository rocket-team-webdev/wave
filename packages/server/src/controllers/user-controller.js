const db = require("../models");

async function signUp(req, res, next) {
  const { firebaseId } = req.user;

  try {
    const data = await db.User.findOne({ firebaseId });

    if (!data) {
      const newUser = await db.User.create({
        ...req.user,
        ...req.body,
      });

      return res
        .status(200)
        .send({ message: "Successfully signed up", userId: newUser._id });
    }

    res.status(200).send({ message: "User found", userId: data._id });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const { firebaseId } = req.user;

    const data = await db.User.findOne(
      { firebaseId },
      { firstName: 1, lastName: 1, profilePicture: 1, _id: 0 },
    );

    res.status(200).send({ message: "Successfully signed in", data: data });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
};
