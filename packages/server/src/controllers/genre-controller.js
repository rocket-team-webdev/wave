const db = require("../models");

async function getGenres(req, res, next) {
  try {
    const { page = 0, limit = 10 } = req.query;

    const genres = await db.Genre.find({}, { _id: 1, popularity: 1, name: 1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ genres });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function getPopularGenres(req, res, next) {
  try {
    const { page = 0, limit = 10 } = req.query;

    const genres = await db.Genre.find({}, { _id: 1, popularity: 1, name: 1 })
      .sort({ popularity: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ genres });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

module.exports = {
  getGenres,
  getPopularGenres,
};
