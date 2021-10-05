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

module.exports = {
  searchRouter,
};
