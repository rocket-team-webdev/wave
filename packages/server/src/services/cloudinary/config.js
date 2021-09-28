const { config } = require("../../config");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret,
});

module.exports = { cloudinary };
