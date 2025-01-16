const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("./generateTokenService");
const { checkPassword } = require("./checkPasswordService");

const prisma = new PrismaClient();

const loginAdmin = async (email, password) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

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

const checkIfUserIsAdmin = async (user) => {
  const admin = await prisma.admin.findUnique({
    where: { id: user.userId },
  });

  if (admin) {
    return true;
  }

  return false;
};

module.exports = { loginAdmin, checkIfUserIsAdmin };
