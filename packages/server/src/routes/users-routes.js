const { usersController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const usersRouter = Router();

usersRouter.get(
  "/popular",
  authFirebaseMiddleware,
  usersController.getAllUsers,
);

usersRouter.get(
  "/:id/followers",
  authFirebaseMiddleware,
  usersController.getUserFollowers,
);

usersRouter.get(
  "/:id/following",
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
  "/:id/albums/liked",
  authFirebaseMiddleware,
  usersController.getUserLikedAlbums,
);

usersRouter.get(
  "/:id/albums",
  authFirebaseMiddleware,
  usersController.getUserAlbums,
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

usersRouter.post(
  "/:id/follow",
  authFirebaseMiddleware,
  usersController.followUser,
);

module.exports = {
  usersRouter,
};
