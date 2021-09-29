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
  },
  test: {
    app: {
      port: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
  },
};

module.exports = {
  config: CONFIG[NODE_ENV],
};
