const cors = require("cors");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const mysql = require("mysql");
const connection = require("./lib/db");

const indexRoute = require("./routes/index");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//todo view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRoute);

// todo not found routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// todo server error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
