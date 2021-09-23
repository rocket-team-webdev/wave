const db = require("../models");

async function getAccount(req, res) {
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

module.exports = {
  getAccount: getAccount,
  updateAccount: updateAccount,
};
