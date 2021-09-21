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

module.exports = {
  getUser: getUser,
};
