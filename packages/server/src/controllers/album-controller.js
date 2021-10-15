const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const { getPublicId } = require("../utils/cloudinaryUtils");
const { DEFAULT_ALBUM_THUMBNAIL } = require("../utils/default-presets");

async function getAlbums(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const albums = await db.Album.aggregate([
      {
        $project: {
          title: 1,
          likes: { $size: "$likedBy" },
          totalTracks: 1,
          isLiked: { $setIsSubset: [[userId], "$likedBy"] },
          thumbnail: 1,
          year: 1,
          userId: 1,
        },
      },
      {
        $sort: {
          likes: -1,
        },
      },
    ]);

    res.status(200).send({ albums });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function addAlbum(req, res, next) {
  try {
    const { firebaseId } = req.user;
    const { _id: userId } = await db.User.findOne({ firebaseId }, { _id: 1 });
    const albumObj = {};
    let thumbnail = req.files["thumbnail"];

    // Checking if title album already exists
    const isAlbum = await db.Album.findOne(
      {
        title: req.body.title,
        userId: userId,
      },
      { _id: 1 },
    );
    if (isAlbum) {
      return res.status(409).send({ msg: "Error: Album already exists" });
    }

    // Album cover by default
    albumObj.thumbnail = DEFAULT_ALBUM_THUMBNAIL;
    // if there is a thumbnail
    if (thumbnail) {
      thumbnail = thumbnail[0];
      console.log("What we take for upload", thumbnail);
      const thumbnailLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        thumbnail.originalname,
      );

      // upload file
      await writeFileAsync(
        thumbnailLocation,
        Buffer.from(new Uint8Array(thumbnail.buffer)),
      );

      // upload to cloudinary
      const cldThumbnailRes = await cloudinary.uploader.upload(
        thumbnailLocation,
        {
          upload_preset: "covers-preset",
          resource_type: "image",
          quality: "auto:good",
          width: 300,
          height: 300,
          crop: "limit",
        },
      );
      albumObj.thumbnail = cldThumbnailRes.secure_url;

      // delete uploaded file
      fs.unlink(thumbnailLocation, (err) => {
        if (err) throw err;
      });
    }
    // Mongodb store data
    albumObj.title = req.body.title;
    albumObj.year = req.body.year;
    albumObj.userId = userId;

    await db.Album.create(albumObj);

    return res.status(200).send({ message: "album created successfully" });
  } catch (error) {
    res.status(500).send({ error: error });
    next(error);
  }
}

async function getAlbumById(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const album = await db.Album.findOne(
      { _id: id },
      {
        title: 1,
        year: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
        thumbnail: 1,
        userId: 1,
        tracks: 1,
      },
    )
      .populate({
        path: "userId",
        options: { select: "firstName" },
      })
      .lean();

    const tracks = await db.Track.find(
      { album: id },
      {
        name: 1,
        artist: 1,
        url: 1,
        duration: 1,
        genreId: 1,
        userId: 1,
        album: 1,
        likes: { $size: "$likedBy" },
        isLiked: { $setIsSubset: [[userId], "$likedBy"] },
      },
    ).populate([
      {
        path: "genreId",
        options: { select: "name" },
      },
      {
        path: "album",
        options: {
          select: "title thumbnail",
        },
      },
    ]);

    album.tracks = tracks;

    res.status(200).send({ data: album });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function updateAlbum(req, res, next) {
  try {
    const { email } = req.user;
    const { id } = req.body;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { thumbnail: oldThumbnail } = await db.Album.findOne(
      { _id: id, userId: userId },
      {
        thumbnail: 1,
        _id: 0,
      },
    );

    let thumbnailUrl = oldThumbnail;
    let thumbnailFile = req.files["thumbnail"];

    if (thumbnailFile) {
      const isThumbnailDefault =
        oldThumbnail === DEFAULT_ALBUM_THUMBNAIL ? true : false;

      thumbnailFile = thumbnailFile[0];
      const thumbnailLocation = path.join(
        __dirname,
        "../../",
        "uploads",
        thumbnailFile.originalname,
      );

      // upload file
      await writeFileAsync(
        thumbnailLocation,
        Buffer.from(new Uint8Array(thumbnailFile.buffer)),
      );

      // upload to cloudinary
      const cldThumbnailRes = await cloudinary.uploader.upload(
        thumbnailLocation,
        {
          upload_preset: "covers-preset",
          resource_type: "image",
          width: 300,
          height: 300,
          crop: "limit",
        },
      );
      thumbnailUrl = cldThumbnailRes.secure_url;

      // delete old picture on cloudinary
      if (!isThumbnailDefault) {
        const publicId = getPublicId(oldThumbnail);
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      }

      // delete uploaded file
      fs.unlink(thumbnailLocation, (err) => {
        if (err) throw err;
      });
    }

    const { title, year } = req.body;

    await db.Album.findOneAndUpdate(
      { _id: id },
      { title: title, year: year, thumbnail: thumbnailUrl },
    ).lean();

    res.status(200).send({
      message: "Album updated successfully",
    });
  } catch (error) {
    res.status(400).send({ error: error });
    next();
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { thumbnail: thumbnail } = await db.Album.findOne(
      { _id: id, userId: userId },
      {
        thumbnail: 1,
        _id: 0,
      },
    );

    // deleting tracks from album
    await db.Track.deleteMany({ album: id, userId: userId });

    // deleting albums
    await db.Album.findOneAndDelete({ _id: id, userId: userId });

    // deleting cover from cloudinary
    if (thumbnail !== DEFAULT_ALBUM_THUMBNAIL) {
      const publicId = getPublicId(thumbnail);
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    }

    res.status(200).send({ message: "Album deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function likeAlbum(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Album.findOneAndUpdate({ _id: id }, [
      {
        $set: {
          likedBy: {
            $cond: {
              if: { $in: [userId, "$likedBy"] },
              then: { $setDifference: ["$likedBy", [userId]] },
              else: { $concatArrays: ["$likedBy", [userId]] },
            },
          },
        },
      },
    ]);

    res.status(200).send({
      message: "Album liked successfully",
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  getAlbums,
  getAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  likeAlbum,
};
