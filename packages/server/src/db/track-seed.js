const db = require("../models");

async function getSeedTrack() {
  let { _id: userId } = await db.User.findOne({}, { _id: 1 }).lean();
  let { _id: genreId } = await db.Genre.findOne({}, { _id: 1 }).lean();
  let { _id: albumId } = await db.Album.findOne({}, { _id: 1 }).lean();
  return [
    {
      name: "Song 1",
      url: "https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147267/music-uploads/bensound-creativeminds_vjqm2b.mp3",
      duration: 140,
      genreId: genreId,
      userId: userId,
      album: albumId,
    },
    {
      name: "Song 2",
      url: "https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147266/music-uploads/bensound-happyrock_bg3hh6.mp3",
      duration: 180,
      genreId: genreId,
      userId: userId,
      album: albumId,
    },
  ];
}

module.exports = { getSeedTrack };
