const router = require("express").Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  console.log("hit the api");
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);
    console.log(data, "**********");
    const userExist = await User.findOne({ email: data.email });

    if (!userExist) return res.status(403).json("User account not found");

    const checkPass = await bcrypt.compare(data.password, userExist.password);

    if (!checkPass) return res.status(403).json("incorrect password");

    const token = jwt.sign(userExist.email, process.env.TOKEN_SECRET);

    await User.updateOne({ email: userExist.email }, { token: token });

    return res.json({
      email: userExist.email,
      name: userExist.name,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Something went wrong");
  }
});

module.exports = router;
