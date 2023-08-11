const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const verifyToken = async (req, res, next) => {
  try {
    let token = req.session.token;

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).send({ message: "Authentication Failed." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { verifyToken };
