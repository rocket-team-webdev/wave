const { meController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const meRouter = Router();

meRouter.get("/tracks", authFirebaseMiddleware, meController.getMyTracks);
meRouter.get(
  "/tracks/liked",
  authFirebaseMiddleware,
  meController.getMyLikedTracks,
);

module.exports = {
  meRouter,
};
