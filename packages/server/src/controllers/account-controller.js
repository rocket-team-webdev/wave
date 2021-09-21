const db = require("../models");

async function getUser(req, res, next) {
  try {
    const user = await db.User.findOne({ email: req.body.email });

    if (user)
      res.status(200).send({
        data: user,
      });
    else
      res.status(404).send({
        message: "User not found",
      });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  const { id: userId } = req.params;

  try {
    const updatedUser = await db.User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).send({
      data: updatedUser,
    });
  } catch (err) {
    res.status(404).send({
      error: err,
    });
    next(err);
  }
}

module.exports = {
  getUser: getUser,
  updateUser: updateUser,
};
