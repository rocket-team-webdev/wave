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

    const genres = await db.Track.aggregate([
      { $group: { _id: "$genreId", popularity: { $sum: "$popularity" } } },
      {
        $lookup: {
          from: "genres",
          localField: "_id",
          foreignField: "_id",
          as: "genres",
        },
      },
      { $unwind: { path: "$genres" } },
      { $project: { _id: 1, popularity: 1, name: "$genres.name" } },
    ])
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
