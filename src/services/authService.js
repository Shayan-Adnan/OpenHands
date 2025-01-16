const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("./generateTokenService");
const { checkPassword } = require("./checkPasswordService");

const prisma = new PrismaClient();

const loginUser = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await checkPassword(user, password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials.");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user);

    return { user, token };
  } catch (err) {
    console.error("Error in prisma query: ", err);
    throw err;
  }
};

const signUpUser = async (
  firstName,
  lastName,
  username,
  email,
  password,
  country,
  city
) => {
  try {
    //console.log(firstName, lastName, username, email, password, country, city);

    //checking if user exists - tried to make this a separate function to share it between login and signup but that didnt work
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const error = new Error(
        "An account is already registered with this email."
      );
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10); //encrypting password

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        country,
        city,
      },
    });
  } catch (error) {
    console.error("Error in prisma query: ", error);
    throw error;
  }
};

module.exports = { loginUser, signUpUser };
