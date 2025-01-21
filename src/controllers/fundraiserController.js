const { PrismaClient } = require("@prisma/client");
const { getRelativePath } = require("../middleware/multerConfig");
const prisma = new PrismaClient();
const { decodeToken } = require("../services/generateTokenService");

const createFundraiserRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, details, amountNeeded } = req.body;

    const imageName = getRelativePath(req.files["image"][0].filename, "image"); //get the relative path where the first file from the image field was stored
    const documentName = getRelativePath(
      req.files["document"][0].filename,
      "document"
    ); //same as above but for the document field

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

const fetchFundraiserRequests = async (req, res) => {
  try {
    const pendingRequests = await prisma.pendingRequests.findMany();
    if (!pendingRequests) {
      res.status(404).json();
    }
    res.status(200).json({ success: true, pendingRequests });
  } catch (error) {
    console.error(error); //for testing
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFundraiserRequest, fetchFundraiserRequests };
