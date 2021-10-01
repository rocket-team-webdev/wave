const db = require("../models");

async function getGenres(req, res, next) {
  try {
    const { page = 0, limit = 10 } = req.query;

    const genres = await db.Genre.find({})
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

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
