const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const favicon = require("serve-favicon");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/auth.route");
const convertRouter = require("./src/routes/pdfConverter.route");

const app = express();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "jade");
app.use(cors());
app.use(express.static("views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/convert", convertRouter);

module.exports = app;
