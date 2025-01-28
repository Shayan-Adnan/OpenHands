const { getRelativePath } = require("../middleware/multerConfig");
const { transporter, createMail } = require("../services/nodemailerService");
const { decodeToken } = require("../services/generateTokenService");
const config = require("../config/config");
const path = require("path");
const fs = require("fs");
const fundraiserModel = require("../models/fundraiserModel");

const createFundraiserRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, title, details, amountNeeded } =
      req.body;

    const imageName = getRelativePath(req.files["image"][0].filename, "image"); //get the relative path where the first file from the image field was stored
    const documentName = getRelativePath(
      req.files["document"][0].filename,
      "document"
    ); //same as above but for the document field

    const userId = decodeToken(req.cookies.jwt).userId; //getting user id from jwt

    const pendingRequest = await fundraiserModel.createFundraiserRequest(
      firstName,
      lastName,
      email,
      title,
      details,
      imageName,
      documentName,
      amountNeeded,
      userId
    );

    res.status(201).json();
  } catch (error) {
    console.error(error); //for testing
    res.status(500).json({ message: error.message });
  }
};

const fetchFundraiserRequests = async (req, res) => {
  try {
    const pendingRequests = await fundraiserModel.getFundraiserRequests();

    if (!pendingRequests) {
      res.status(404).json();
    }
    res.status(200).json({ success: true, pendingRequests });
  } catch (error) {
    console.error(error); //for testing
    res.status(500).json({ message: error.message });
  }
};

const fetchApprovedFundraisers = async (req, res) => {
  try {
    const approvedFundraisers = await fundraiserModel.getApprovedFundraisers();

    if (!approvedFundraisers) {
      res.status(404).json();
    }
    res.status(200).json({ success: true, approvedFundraisers });
  } catch (error) {
    console.error(error); //for testing
    res.status(500).json({ message: error.message });
  }
};

const approveFundraiserRequest = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await fundraiserModel.getFundraiserRequest(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    const { pendingRequestId, requestCreatedAt, ...processedRequestData } =
      request; //removing the requestcreatedAt field as that does not exist in the processedreq table and also removing id to avoid duplication

    const processedRequest = await fundraiserModel.approveFundraiser(
      processedRequestData,
      id
    );

    transporter.sendMail(
      //send an email to the user
      createMail(
        request.title,
        "Approved",
        config.MAIL_USER,
        request.email,
        "OpenHands Fundraiser Request Update"
      )
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectFundraiserRequest = async (req, res) => {
  try {
    const { id } = req.body;

    const request = await fundraiserModel.getFundraiserRequest(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const {
      pendingRequestId,
      requestCreatedAt,
      imageName,
      documentName,
      ...processedRequestData
    } = request; //removing the requestcreatedAt field as that does not exist in the processedreq table

    const processedRequest = await fundraiserModel.rejectFundraiser(
      processedRequestData,
      imageName,
      documentName,
      id
    );

    const imagePath = path.join(__dirname, "..", "..", "public", imageName); // construct image path
    const documentPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      documentName
    ); // construct document path

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // delete the image file
      console.log(`Image deleted: ${imagePath}`);
    } else {
      console.log(`Image not found: ${imagePath}`);
    }

    // Delete the document file
    if (fs.existsSync(documentPath)) {
      fs.unlinkSync(documentPath); // Sync delete the doc file
      console.log(`Document deleted: ${documentPath}`);
    } else {
      console.log(`Document not found: ${documentPath}`);
    }

    transporter.sendMail(
      //send an email to the user
      createMail(
        request.title,
        "Rejected",
        config.MAIL_USER,
        request.email,
        "OpenHands Fundraiser Request Update"
      )
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error rejecting request:", error); //for testing
    res.status(500).json({ error });
  }
};

const fetchFundraiser = async (req, res) => {
  try {
    const { id } = req.params;

    const fundraiser = await fundraiserModel.getFundraiser(id);

    if (!fundraiser) {
      res
        .status(404)
        .json({ success: false, message: "404: Fundraiser Not Found!" });
    }

    res.status(200).json({ success: true, fundraiser });
  } catch (error) {
    console.error("Error occured while fetching fundraiser: ", error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createFundraiserRequest,
  fetchFundraiserRequests,
  approveFundraiserRequest,
  rejectFundraiserRequest,
  fetchApprovedFundraisers,
  fetchFundraiser,
};
