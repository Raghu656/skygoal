const User = require("../models/user");
const jwt = require("jsonwebtoken");

const validate = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token == null) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).send("Unauthorized");
    const userData = await User.findOne({ email: user });
    req.user = userData;
    next();
  });
};

module.exports = { validate };
