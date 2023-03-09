const userModel = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUpEmail } = require("./mailer");

const getUser = async (req, res) => {
  try {
    const myGet = await userModel.find();
    res.status(200).json({
      message: "Data Gotten",
      data: myGet,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      data: error.message,
    });
  }
};

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const tokenValue = "dhhfjjd";

    const myToken = jwt.sign({ tokenValue }, "hshf", {
      expiresIn: "30min",
    });

    const newUser = await userModel.create({
      name,
      email,
      password: hash,
    });

    signUpEmail(newUser)
      .then((res) => {
        console.log(`Mail Sent...`, res);
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(201).json({
      message: "Mail sent to your mail...",
    });
  } catch (error) {
    res.status(400).json({
      message: "Post Error",
      data: error.message,
    });
  }
};

module.exports = { getUser, signUpUser };
