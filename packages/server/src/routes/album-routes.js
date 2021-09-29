const { albumController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const albumRouter = Router();

albumRouter.get("", [authFirebaseMiddleware], albumController.getAlbums);

module.exports = {
  albumRouter,
};
