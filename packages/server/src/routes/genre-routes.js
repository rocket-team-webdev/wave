const { genreController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const genreRouter = Router();

genreRouter.get("", [authFirebaseMiddleware], genreController.getPopularGenres);

module.exports = {
  genreRouter,
};
