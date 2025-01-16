const bcrypt = require("bcrypt");

const checkPassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};

module.exports = { checkPassword };
