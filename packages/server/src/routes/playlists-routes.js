const { playlistsController } = require("../controllers");
const Router = require("express").Router;

const playlistsRouter = Router();

playlistsRouter.get("/", playlistsController.getPlaylists);

module.exports = {
  playlistsRouter,
};
