const db = require("../models");

async function getGenres(req, res, next) {
  try {
    const genres = await db.Genre.find({});

    res.status(200).send({ genres });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

module.exports = {
  getGenres,
};
