const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, config.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = { generateToken, decodeToken };
