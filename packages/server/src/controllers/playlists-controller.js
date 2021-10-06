const db = require("../models");
const { cloudinary } = require("../services/cloudinary");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { DEFAULT_PLAYLIST_THUMBNAIL } = require("../utils/default-presets");
const { getPublicId } = require("../utils/cloudinaryUtils");
const writeFileAsync = promisify(fs.writeFile);

async function getPlaylists(req, res, next) {
  try {
    const { page = 0, limit = 4 } = req.query;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    const foundPlaylists = await db.Playlist.find(
      {
        $or: [{ publicAccessible: true }, { userId: userId }],
        isDeleted: false,
      },
      {
        name: 1,
        follows: { $size: "$followedBy" },
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        primaryColor: 1,
        thumbnail: 1,
        userId: 1,
      },
    )
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ playlists: foundPlaylists });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function addPlaylist(req, res, next) {
  try {
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const playlistObj = {};
    let thumbnail = req.files["thumbnail"];

    // Checking if playlist name already exists
    const playlistExists = await db.Album.findOne(
      {
        title: req.body.title,
        userId: userId,
        isDeleted: false,
      },
      { _id: 1 },
    );
    if (playlistExists) {
      return res.status(409).send({ msg: "Error: Playlist already exists" });
    }

    // Playlist cover by default
    playlistObj.thumbnail = DEFAULT_PLAYLIST_THUMBNAIL;
    // if there is a thumbnail
    if (thumbnail) {
      thumbnail = thumbnail[0];
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
        },
      );
      playlistObj.thumbnail = cldThumbnailRes.secure_url;

      // delete uploaded file
      fs.unlink(thumbnailLocation, (err) => {
        if (err) throw err;
      });
    }

    // Mongodb store data
    playlistObj.name = req.body.name;
    playlistObj.description = req.body.description;
    playlistObj.primaryColor = req.body.primaryColor;
    playlistObj.collaborative = req.body.collaborative;
    playlistObj.publicAccessible = req.body.publicAccessible;
    playlistObj.userId = userId;

    await db.Playlist.create(playlistObj);

    return res.status(200).send({ message: "Playlist created successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function updatePlaylist(req, res, next) {
  try {
    const { email } = req.user;
    const { id } = req.body;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    console.log("userId", userId);
    let thumbnailFile = req.files["thumbnail"];
    let thumbnailUrl = DEFAULT_PLAYLIST_THUMBNAIL;

    if (thumbnailFile) {
      const { thumbnail: oldThumbnail } = await db.Playlist.findOne(
        { _id: id, isDeleted: false, userId: userId },
        {
          // collaborative: 1,
          // publicAccessible: 1,
          // name: 1,
          thumbnail: 1,
          // description: 1,
          // primaryColor: 1,
          _id: 0,
        },
      );

      const isThumbnailDefault =
        oldThumbnail === DEFAULT_PLAYLIST_THUMBNAIL ? true : false;

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

    const { name, description, primaryColor, collaborative, publicAccessible } =
      req.body;
    await db.Playlist.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        primaryColor: primaryColor,
        collaborative: collaborative,
        publicAccessible: publicAccessible,
        thumbnail: thumbnailUrl,
      },
    );

    res.status(200).send({
      message: "Successful update",
    });
  } catch (error) {
    res.status(400).send({ error: error });
    next();
  }
}

async function getPlaylistById(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });
    const { page = 0, limit = 5 } = req.query;

    const playlist = await db.Playlist.findOne(
      { _id: id, isDeleted: false },
      {
        name: 1,
        collaborative: 1,
        follows: { $size: "$followedBy" },
        isFollowed: { $setIsSubset: [[userId], "$followedBy"] },
        description: 1,
        primaryColor: 1,
        thumbnail: 1,
        publicAccessible: 1,
        userId: 1,
        tracks: 1,
      },
    )
      .populate({
        path: "tracks",
        select: {
          name: 1,
          artist: 1,
          likes: { $size: "$likedBy" },
          isLiked: { $setIsSubset: [[userId], "$likedBy"] },
          popularity: 1,
          color: 1,
          genreId: 1,
          userId: 1,
          album: 1,
          duration: 1,
          url: 1,
        },
        options: {
          skip: parseInt(page) * parseInt(limit),
          limit: parseInt(limit),
        },
        populate: [
          {
            path: "album",
            options: {
              select: "title thumbnail",
            },
          },
          {
            path: "genreId",
            options: {
              select: "name",
            },
          },
        ],
      })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).send({ data: playlist });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function deletePlaylist(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    db.Playlist.findOneAndUpdate(
      { _id: id, userId: userId },
      { isDeleted: true },
    );

    res.status(200).send({ message: "Playlist deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function followPlaylist(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const { _id: userId } = await db.User.findOne({ email }, { _id: 1 });

    await db.Playlist.findOneAndUpdate({ _id: id, isDeleted: false }, [
      {
        $set: {
          followedBy: {
            $cond: {
              if: { $in: [userId, "$followedBy"] },
              then: { $setDifference: ["$followedBy", [userId]] },
              else: { $concatArrays: ["$followedBy", [userId]] },
            },
          },
        },
      },
    ]);

    res.status(200).send({
      message: "Playlist updated successfully",
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  getPlaylists,
  addPlaylist,
  updatePlaylist,
  getPlaylistById,
  deletePlaylist,
  followPlaylist,
};
