const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const User = require("../models/user");

// give to Bearer Token
router.get("/getuserdata", validate, async (req, res) => {
  return res.json(req.user);
});

// this is unauthorized API
// don't give to Bearer Token
router.get("/allusersdata", validate, async (req, res) => {
  res.send(await User.find().sort({ _id: -1 }));
});

module.exports = router;
