const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, config.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = { generateToken };
