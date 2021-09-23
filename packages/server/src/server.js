const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const { accountRouter, userRouter } = require("./routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api", accountRouter);
app.use("/api", userRouter);

module.exports = app;
