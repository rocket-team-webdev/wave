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

app.use("/api", userRouter);
app.use("/api/account", accountRouter);

module.exports = app;

// --
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.post("/api/upload", (req, res) => {
//   try {
//     const fileStr = req.body.data;
//     console.log(fileStr);
//   } catch (error) {
//     console.error(error);
//   }
// });
