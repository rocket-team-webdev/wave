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

//! FALTA POR IMPLEMENTAR FIREBASE
async function updateUser(req, res) {
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
      error: err.message,
    });
  }
}

module.exports = {
  getUser: getUser,
  updateUser: updateUser,
};
