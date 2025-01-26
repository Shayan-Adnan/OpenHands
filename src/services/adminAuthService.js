const { generateToken } = require("./generateTokenService");
const { checkPassword } = require("./checkPasswordService");
const adminModel = require("../models/adminModel");

const loginAdmin = async (email, password) => {
  try {
    const admin = await adminModel.findAdmin(email);

    if (!admin) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await checkPassword(admin, password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials.");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(admin);

    return { admin, token };
  } catch (error) {
    console.error("Error in prisma query: ", error);
    throw error;
  }
};

const checkIfUserIsAdmin = async (id) => {
  const admin = await adminModel.checkIfAdmin(id);

  if (admin) {
    return true;
  }

  return false;
};

module.exports = { loginAdmin, checkIfUserIsAdmin };
