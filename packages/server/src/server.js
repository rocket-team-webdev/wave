const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const { accountRouter, userRouter, playlistsRouter } = require("./routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/playlists", playlistsRouter);

module.exports = app;
