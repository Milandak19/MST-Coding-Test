const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { uploader } = require("../helpers/upload.helper");
const { sendEmail } = require("../helpers/sendmail.helper");
const User = db.user;

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const photo = await uploader(req.file);
    
    sendEmail(
      req.body.email,
      "verify your account",
      `<p>Verify your email, click this url <a href="https://asdasd.com/auth/verify-email/asd123123dasqwe">https://asdasd.com/auth/verify-email/asd123123dasqwe</a></p>`
    );

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      photo: photo,
      fullname: req.body.fullname,
    });

    res.status(200).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        photo: user.photo,
        fullname: user.fullname,
      },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      photo: user.photo,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}