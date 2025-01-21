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

module.exports = router;
