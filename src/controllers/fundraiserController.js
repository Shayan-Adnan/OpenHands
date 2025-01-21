const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { decodeToken } = require("../services/generateTokenService");

const createFundraiserRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, details, amountNeeded } = req.body;

    const imageName = req.files["image"][0].path; //get the path where the first file from the image field was stored
    const documentName = req.files["document"][0].path; //same as above but for the document field

    const userId = decodeToken(req.cookies.jwt).userId; //getting user id from jwt

    const pendingRequest = await prisma.pendingRequests.create({
      data: {
        firstName,
        lastName,
        email,
        details,
        imageName,
        documentName,
        amountNeeded: parseInt(req.body.amountNeeded),
        userId,
      },
    });

    res.status(201).json();
  } catch (error) {
    console.error(error); //for testing
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFundraiserRequest };
