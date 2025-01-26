const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findUser = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (
  firstName,
  lastName,
  username,
  email,
  hashedPassword,
  country,
  city
) => {
  return await prisma.user.create({
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
};

module.exports = { findUser, createUser };
