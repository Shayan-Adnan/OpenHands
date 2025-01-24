const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.MAIL_USER,
    pass: config.APP_PASSWORD,
  },
});

const createMail = (title, status, from, to, subject) => {
  return {
    from,
    to,
    subject,
    text: `Your fundraiser request with the title '${title}' has been ${status}! Visit your user profile for more details.`,
  };
};

module.exports = { transporter, createMail };
