require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
};
