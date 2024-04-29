const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

require("dotenv").config();

const handelErrors = (err) => {
  console.log(err.message, "Hello");
  if (err.code) console.log(err.code);
  let errors = { name: " ", email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const UserController = Router();

UserController.post("/sign", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, Name and Password are required" });
    }
    if (existingUser) {
      res.status(409).json({ msg: "Already an user!" });
    } else {
      console.log(name, email, password);
      bcrypt.hash(password, 5, async function (err, hash) {
        if (hash) {
          const user = new UserModel({
            name,
            email,
            password: hash,
          });
          await user.save();
          const token = jwt.sign(
            { userId: user._id },
            process.env.EncryptionKey
          );

          res.status(201).json({
            msg: "Account Created!",
            user: { id: user._id, name, email, token },
          });
        } else if (err) {
          res.status(500).json({ msg: "Something went wrong try again!" });
          console.log(err);
        } else {
          res.status(500).json({ msg: "Invalid Credentials!" });
        }
      });
    }
  } catch (e) {
    console.log("error", e);
    if (e.errors && e.errors.email) {
      const errors = handelErrors(e);
      return res.status(400).json({ errors });
    }

    res.status(500).json({ msg: "Internal server error" });
  }
});

UserController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    const cipher = existingUser.password;
    console.log(existingUser);
    bcrypt.compare(password, cipher, (err, result) => {
      if (err) {
        res
          .status(400)
          .json({ msg: "Something went wrong try again", error: err });
      } else if (result) {
        const token = jwt.sign(
          { userId: existingUser._id },
          process.env.EncryptionKey
        );
        res.status(200).json({
          msg: "Succesfully login ",
          token,
          user: {
            email: existingUser._doc.email,
            name: existingUser._doc.name,
            id: existingUser._doc._id,
            profileImg: existingUser._doc.profileImg,
          },
        });
      } else {
        res.status(500).json({ msg: "Invalid credentials" });
      }
    });
  } else {
    res.status(500).json({ msg: "Login First!" });
  }
});

module.exports = UserController;
