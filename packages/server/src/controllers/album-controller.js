const db = require("../models");

async function getAlbums(req, res, next) {
  try {
    const { email } = req.user;
    const user = await db.User.findOne({ email });

    const albums = await db.Album.find({ userId: user._id });

    res.status(200).send({ albums });
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
    next(err);
  }
}

async function addAlbum(req, res, next) {
  let thumbnail = req.files["thumbnail"];

  if (thumbnail) thumbnail = thumbnail[0];

  // if there is a thumbnail
  if (thumbnail) {
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
    trackObj.thumbnail = cldThumbnailRes.secure_url;

    // delete uploaded file
    fs.unlink(thumbnailLocation, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = {
  getAlbums,
};
