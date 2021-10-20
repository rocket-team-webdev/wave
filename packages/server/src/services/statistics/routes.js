const dotenv = require("dotenv");

dotenv.config();

const { WAVE_STATS_API_ROUTE } = process.env;

const STATS_API = {
  MAIN: WAVE_STATS_API_ROUTE,
  PLAYBACKS: "/playbacks",
};

module.exports = {
  STATS_API,
};
