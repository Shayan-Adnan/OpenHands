const multer = require("multer");
const path = require("path");

//Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "image") {
      cb(null, path.join(__dirname, "../public/fundraiserImages"));
    } else if (file.fieldname == "document") {
      cb(null, path.join(__dirname, "../public/fundraiserDocuments"));
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = { upload };
