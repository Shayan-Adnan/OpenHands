const express = require("express");
const router = express.Router();
const fundraiserController = require("../controllers/fundraiserController");
const { upload } = require("../middleware/multerConfig");

router.post(
  "/createFundraiserRequest",
  upload.fields([{ name: "image" }, { name: "document" }]),
  fundraiserController.createFundraiserRequest
);

router.get(
  "/fetchFundraiserRequests",
  fundraiserController.fetchFundraiserRequests
);

router.post(
  "/approveFundraiserRequest",
  fundraiserController.approveFundraiserRequest
);

router.post(
  "/rejectFundraiserRequest",
  fundraiserController.rejectFundraiserRequest
);

router.get(
  "/fetchApprovedFundraisers",
  fundraiserController.fetchApprovedFundraisers
);

router.get("/fetchFundraiser/:id", fundraiserController.fetchFundraiser);

module.exports = router;
