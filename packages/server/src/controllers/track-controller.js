const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const { getPublicId } = require("../utils/cloudinaryUtils");

async function uploadTrack(req, res, next) {
  try {
    const trackObj = {};
    const track = req.files["track"][0];

    if (track.mimetype === "audio/mpeg") {
      const trackLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        track.originalname,
      );

      await writeFileAsync(
        trackLocation,
        Buffer.from(new Uint8Array(track.buffer)),
      );

      // upload to cloudinary
      const cldTrackRes = await cloudinary.uploader.upload(trackLocation, {
        upload_preset: "tracks-preset",
        resource_type: "video",
      });

      // delete uploaded file
      fs.unlink(trackLocation, (err) => {
        if (err) throw err;
      });

      // Mogodb store data
      const { firebaseId } = req.user;
      const { _id: userId } = await db.User.findOne({ firebaseId });
      const genre = await db.Genre.findOne({ name: req.body.genre });
      const album = await db.Album.findOne({
        title: req.body.album,
      });

      trackObj.name = req.body.name;
      trackObj.artist = req.body.artist;
      trackObj.url = cldTrackRes.secure_url;
      trackObj.public_id = cldTrackRes.public_id;
      trackObj.duration = cldTrackRes.duration;
      trackObj.userId = userId;
      if (album) trackObj.album = album._id;
      if (genre) trackObj.genreId = genre._id;

      console.log("trackObj", trackObj);

      await db.Track.create(trackObj);
      await db.Album.updateOne(
        { _id: album._id },
        { $inc: { totalTracks: 1 } },
      );

      return res.status(200).send({ message: "cloudinary track uploaded" });
    }

    return res
      .status(400)
      .send({ message: "This file format is not supported!" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  console.log("Deleting... ", req.params);
  const { id } = req.params;
  try {
    const track = await db.Track.findOne({ _id: id });
    const { url } = track;

    // ----
    // Delete from Cloudinary
    const publicId = getPublicId(url);
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    // ----
    // Delete from MongoDB Atlas
    await db.Track.findByIdAndRemove(id);

    return res.status(200).send({ message: "Successfully deleted track" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

module.exports = {
  uploadTrack,
  deleteTrack,
};
