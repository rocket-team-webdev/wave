const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV = "production",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  // ACCESS_TOKEN_SECRET,
  PORT,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
  WAVE_STATS_API_KEY,
} = process.env;

const CONFIG = {
  production: {
    app: {
      port: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
    },
    cloudinary: {
      key: CLOUDINARY_API_KEY,
      secret: CLOUDINARY_API_SECRET,
      name: CLOUDINARY_NAME,
    },
    statsServer: {
      key: WAVE_STATS_API_KEY,
    },
  },
  development: {
    app: {
      port: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
    cloudinary: {
      key: CLOUDINARY_API_KEY,
      secret: CLOUDINARY_API_SECRET,
      name: CLOUDINARY_NAME,
    },
    statsServer: {
      key: WAVE_STATS_API_KEY,
    },
  },
  test: {
    app: {
      port: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
    cloudinary: {
      key: CLOUDINARY_API_KEY,
      secret: CLOUDINARY_API_SECRET,
      name: CLOUDINARY_NAME,
    },
    statsServer: {
      key: WAVE_STATS_API_KEY,
    },
  },
};

module.exports = {
  config: CONFIG[NODE_ENV],
};
