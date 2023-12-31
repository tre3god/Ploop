//* import -> require
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("ploop:server");

const usersRouter = require("./routes/api/usersRoutes");
const recordsRouter = require("./routes/api/recordRoutes");
const commentsRouter = require("./routes/api/hcProfRoutes");
const checkTokenMiddleware = require("./config/checkToken");

//* app
const app = express();

//* middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use(checkTokenMiddleware);

//* routes
app.use("/api/users", usersRouter);
app.use("/api/records", recordsRouter);
app.use("/api/comments", commentsRouter);

//? Catch all routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//* listen
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
