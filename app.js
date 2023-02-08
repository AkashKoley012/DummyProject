const cors = require("cors");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const db = require("./lib/db");

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

app.get("/", (req, res) => {
  var limit = Number(req.query.limit ? req.query.limit : 3);
  var offset = Number(req.query.offset ? req.query.offset : 1);
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) return res.status(400).json({ error: { message: err.message } });
    return res
      .status(200)
      .render("show", { result: result, offset: offset, limit: limit });
  });
});
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
