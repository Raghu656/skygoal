const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const User = require("../models/user");

router.get("/getuserdata", validate, async (req, res) => {
  return res.json(req.user);
});

module.exports = router;
