const router = require("express").Router();
const {
  add,
  show,
  addpage,
  search,
} = require("../controllers/index.controller");

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/add", use(addpage));
router.post("/add", use(add));
router.get("/show", use(show));
router.post("/show", use(search));

module.exports = router;
