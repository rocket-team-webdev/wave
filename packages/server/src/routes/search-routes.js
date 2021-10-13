const { searchController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const searchRouter = Router();

searchRouter.get(
  "/tracks",
  authFirebaseMiddleware,
  searchController.searchTrack,
);

searchRouter.get(
  "/playlists",
  authFirebaseMiddleware,
  searchController.searchPlaylist,
);

module.exports = {
  searchRouter,
};
