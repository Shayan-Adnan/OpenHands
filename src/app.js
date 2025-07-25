const express = require("express");
//const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const fundraiserRoutes = require("./routes/fundraiserRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const pageRoutes = require("./routes/pageRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public"))); //using express to serve static files (html, css)
//app.use(cors()); //enables communication between diff ports
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/adminAuth", adminAuthRoutes);
app.use("/api/fundraiser/", fundraiserRoutes);
app.use("/api/payment/", paymentRoutes);
app.use("/", pageRoutes);

app.set("view engine", "ejs"); //using ejs templating engine
app.set("views", path.join(__dirname, "/views")); //engine will go into views folder to scan for ejs files

module.exports = app;
