const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error();

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json("Bad Credentials");
  }
}

module.exports = {
  create,
  login,
};
