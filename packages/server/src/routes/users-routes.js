const { usersController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const usersRouter = Router();

usersRouter.get(
  "/:id/followers",
  authFirebaseMiddleware,
  usersController.getUserFollowers,
);

usersRouter.get(
  "/:id/followings",
  authFirebaseMiddleware,
  usersController.getUserFollowings,
);

usersRouter.get(
  "/:id/followers",
  authFirebaseMiddleware,
  usersController.getUserFollowers,
);

usersRouter.get(
  "/:id/playlists/following",
  authFirebaseMiddleware,
  usersController.getUserFollowingPlaylists,
);

usersRouter.get(
  "/:id/playlists",
  authFirebaseMiddleware,
  usersController.getUserPlaylists,
);

usersRouter.get(
  "/:id/tracks/liked",
  authFirebaseMiddleware,
  usersController.getUserLikedTracks,
);

usersRouter.get(
  "/:id/tracks",
  authFirebaseMiddleware,
  usersController.getUserTracks,
);

usersRouter.get("/:id", authFirebaseMiddleware, usersController.getUserById);

module.exports = {
  usersRouter,
};
