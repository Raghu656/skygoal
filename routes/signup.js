const router = require("express").Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { json } = require("body-parser");

router.post("/add", async (req, res) => {
  const schema = joi.object({
    password: joi.string().min(6).max(20).required(),
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const emailExist = await User.findOne({ email: data.email });
    const numberExist = await User.findOne({ phone: data.phone });

    if (emailExist)
      return res.status(400).json({ msg: "Email is already used" });

    if (numberExist)
      return res.status(400).json({ msg: "Phone number is already used" });

    const newUser = new User({
      password: hashedPassword,
      email: data.email,
      name: data.name,
      phone: data.phone,
    });

    await newUser.save();

    return res.status(200).json({ msg: "Signup Succesful" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
