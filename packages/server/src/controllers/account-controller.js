const db = require("../models");

async function getAccount(req, res, next) {
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
    next(err);
  }
}

async function updateAccount(req, res) {
  try {
    const { email } = req.user;
    const updatedAccount = await db.User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    res.status(200).send({
      id: updatedAccount._id,
      data: updatedAccount,
      message: "Success",
    });
  } catch (error) {
    res.status(404).send({
      error: error,
    });
  }
}

async function deleteAccount(req, res, next) {
  try {
    const { email } = req.user;
    const deletedAccount = await db.User.findOneAndDelete({ email });

    if (!deletedAccount) res.status(404).send({ message: "User not found!" });

    res.status(200).send({
      data: deletedAccount,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  deleteAccount: deleteAccount,
  getAccount: getAccount,
  updateAccount: updateAccount,
};
