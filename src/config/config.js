require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  MAIL_USER: process.env.MAIL_USER,
  APP_PASSWORD: process.env.APP_PASSWORD,
};
