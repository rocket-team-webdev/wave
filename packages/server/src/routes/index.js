const { accountRouter } = require("./account-router");
const { userRouter } = require("./user-routes");
const { trackRouter } = require("./track-routes");
const { genreRouter } = require("./genre-routes");

module.exports = {
  accountRouter,
  userRouter,
  trackRouter,
  genreRouter,
};
