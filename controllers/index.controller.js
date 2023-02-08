const db = require("../lib/db");

exports.addpage = async (req, res) => {
  return res.status(200).render("index");
};
exports.add = async (req, res) => {
  var limit = Number(req.query.limit ? req.query.limit : 3);
  var offset = Number(req.query.offset ? req.query.offset : 1);
  db.query("INSERT INTO Users SET ?", req.body, (err, result) => {
    if (err) return res.status(400).json({ error: { message: err.message } });
    return res
      .status(200)
      .render("show", { result: result, offset: offset, limit: limit });
  });
};

exports.show = async (req, res) => {
  var limit = Number(req.query.limit ? req.query.limit : 3);
  var offset = Number(req.query.offset ? req.query.offset : 1);
  db.query(
    "SELECT * FROM Users LIMIT ?, ?",
    [limit * (offset - 1), limit],
    (err, result) => {
      if (err) return res.status(400).json({ error: { message: err.message } });
      return res
        .status(200)
        .render("show", { result: result, offset: offset, limit: limit });
    }
  );
};

exports.search = async (req, res) => {
  var limit = Number(req.query.limit ? req.query.limit : 3);
  var offset = Number(req.query.offset ? req.query.offset : 1);
  var search = req.body.search + "%";
  db.query("SELECT * FROM Users WHERE name LIKE ?", search, (err, result) => {
    if (err) return res.status(400).json({ error: { message: err.message } });
    return res
      .status(200)
      .render("show", { result: result, offset: offset, limit: limit });
  });
};
