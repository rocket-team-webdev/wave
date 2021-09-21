const db = require("../models");

async function signUp(req, res) {
  try {
    const data = await db.User.create({
      ...req.user,
      ...req.body,
    });
    res
      .status(200)
      .send({ message: "Successfully signed up", userId: data._id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  signUp: signUp,
};
