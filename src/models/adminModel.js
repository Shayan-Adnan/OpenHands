const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findAdmin = async (email) => {
  return await prisma.admin.findUnique({
    where: { email },
  });
};

const checkIfAdmin = async (id) => {
  return await prisma.admin.findUnique({
    where: { id },
  });
};

module.exports = { findAdmin, checkIfAdmin };
