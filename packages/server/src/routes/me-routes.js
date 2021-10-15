const { meController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const meRouter = Router();

meRouter.get("/followers", authFirebaseMiddleware, meController.getMyFollowers);
meRouter.get(
  "/following",
  authFirebaseMiddleware,
  meController.getMyFollowings,
);
meRouter.get("/playlists", authFirebaseMiddleware, meController.getMyPlaylists);
meRouter.get(
  "/playlists/following",
  authFirebaseMiddleware,
  meController.getMyFollowingPlaylists,
);
meRouter.get("/tracks", authFirebaseMiddleware, meController.getMyTracks);
meRouter.get(
  "/tracks/liked",
  authFirebaseMiddleware,
  meController.getMyLikedTracks,
);
meRouter.get("/albums", authFirebaseMiddleware, meController.getMyAlbums);
meRouter.get(
  "/albums/liked",
  authFirebaseMiddleware,
  meController.getMyLikedAlbums,
);

module.exports = {
  meRouter,
};
