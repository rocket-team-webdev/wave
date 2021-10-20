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

searchRouter.get(
  "/albums",
  authFirebaseMiddleware,
  searchController.searchAlbum,
);

searchRouter.get("/users", authFirebaseMiddleware, searchController.searchUser);

module.exports = {
  searchRouter,
};
