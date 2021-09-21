const db = require("../models");

async function getUser(req, res) {
  try {
    const { email } = req.user;
    const user = await db.User.findOne({ email });

    res.status(200).send({
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
  }
}

async function updateUser(req, res) {
  const { email } = req.user;

  try {
    const updatedUser = await db.User.findByIdAndUpdate(
      { email },
      req.body.user,
      {
        new: true,
      },
    );

    res.status(200).send({
      id: updatedUser._id,
      data: updatedUser,
    });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
  }
}

module.exports = {
  getUser: getUser,
  updateUser: updateUser,
};
