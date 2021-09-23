const db = require("../models");

async function getSeedAlbum() {
  const { _id } = await db.User.findOne({}, { _id: 1 }).lean();
  return [
    {
      title: "Album 1",
      year: 2021,
      userId: _id,
    },
    {
      title: "Album 2",
      year: 2012,
      userId: _id,
    },
    {
      title: "Album 3",
      year: 2012,
      userId: _id,
    },
  ];
}

module.exports = { getSeedAlbum };
