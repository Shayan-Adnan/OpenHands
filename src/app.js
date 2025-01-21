const express = require("express");
//const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const fundraiserRoutes = require("./routes/fundraiserRoutes");
//const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const pageRoutes = require("./routes/pageRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

//app.use(express.json()); - wasnt working for some reason so used bodyparser instead
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public"))); //using express to serve static files (html, css)
//app.use(cors()); //enables communication between diff ports
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/adminAuth", adminAuthRoutes);
app.use("/api/fundraiser/", fundraiserRoutes);
//app.use("/api/admin/", adminDashboardRoutes);
app.use("/", pageRoutes);

app.set("view engine", "ejs"); //using ejs templating engine
app.set("views", path.join(__dirname, "../views")); //engine will go into views folder to scan for ejs files

module.exports = app;
