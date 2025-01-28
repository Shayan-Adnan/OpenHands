const express = require("express");
const path = require("path");
const { checkAuthorization } = require("../middleware/authMiddleware");
//const { checkIfUserIsAdmin } = require("../services/adminAuthService");

const router = express.Router();

router.get("/", checkAuthorization, (req, res) => {
  res.render("index", { user: req.user, isAdmin: req.isAdmin }); //sending user data to homepage to display data accordingly
});

router.get("/login", checkAuthorization, (req, res) => {
  if (req.user) {
    res.redirect("/"); //if already logged in, redirect to home page
  } else {
    res.render("login");
  }
});

router.get("/signup", checkAuthorization, (req, res) => {
  if (req.user) {
    res.redirect("/"); //if already logged in, redirect to home page
  } else {
    res.render("signup");
  }
});

router.get("/adminlogin", checkAuthorization, (req, res) => {
  if (req.user) {
    res.redirect("/"); //if already logged in, redirect to home page
  } else {
    res.render("adminLogin");
  }
});

router.get("/adminDashboard", checkAuthorization, async (req, res) => {
  if (req.user && req.isAdmin) {
    res.render("adminDashboard");
  } else if (req.user && !req.isAdmin) {
    res.redirect("/"); //if a user is logged in but is not an admin, this prevents them from accessing the admin dashboard
  } else {
    res.redirect("adminLogin");
  }
});

router.get(
  "/createFundraiser",
  (req, res, next) => {
    checkAuthorization(req, res, next, true); // Passing true to indicate that user should be redirected if not logged in
  },
  (req, res) => {
    res.render("createFundraiser");
  }
);

router.get("/fundraisers/:id", checkAuthorization, (req, res) => {
  res.render("fundraiserPage", { user: req.user, isAdmin: req.isAdmin });
});

router.get("/aboutUs", checkAuthorization, (req, res) => {
  res.render("aboutUs", { user: req.user, isAdmin: req.isAdmin });
});

router.get("/contactUs", checkAuthorization, (req, res) => {
  res.render("contactUs", { user: req.user, isAdmin: req.isAdmin });
});

router.get("/paymentSuccess", (req, res) => {
  res.render("paymentSuccess");
});

router.get("/paymentCancel", (req, res) => {
  res.render("paymentCancel");
});

router.get("*", (req, res) => {
  res.redirect("/"); // Redirect to the index page
});

module.exports = router;
