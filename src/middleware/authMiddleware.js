const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { checkIfUserIsAdmin } = require("../services/adminAuthService");

//be default, rediretOnFailure is false, but if 'true' is passed in the api, it will become true
const checkAuthorization = async (
  req,
  res,
  next,
  redirectOnFailure = false
) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, config.JWT_SECRET, async (error, decodedToken) => {
      if (error) {
        req.user = null; // set user to null if token is invalid
        if (redirectOnFailure) {
          return res.redirect("/login"); // redirect to login if token is invalid and redirectOnFailure is true
        }
      } else {
        const { userId } = decodedToken;
        const isAdmin = await checkIfUserIsAdmin(userId);

        if (isAdmin) {
          //checking if user is admin
          req.user = decodedToken;
          req.isAdmin = true;
        } else {
          req.user = decodedToken; // simply just add user data to request if token is valid and redirect is false
        }
      }
      next(); // continue to the next function
    });
  } else {
    req.user = null; // set user to null if there's no token
    if (redirectOnFailure) {
      return res.redirect("/login"); // redirect to login if there's no token and redirectOnFailure is true
    }
    next(); // Continue to the next function
  }
};

module.exports = { checkAuthorization };
