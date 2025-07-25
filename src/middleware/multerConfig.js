const fs = require("fs");
const multer = require("multer");
const path = require("path");

const imagesBasePath = path.join(__dirname, "../../public/fundraiserImages");
const documentsBasePath = path.join(
  __dirname,
  "../../public/fundraiserDocuments"
);

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

//Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "image") {
      // ensure folder actually exists before trying to upload files
      ensureDirectoryExists(imagesBasePath);

      cb(null, imagesBasePath);
    } else if (file.fieldname == "document") {
      // ensure folder actually exists before trying to upload files
      ensureDirectoryExists(documentsBasePath);

      cb(null, documentsBasePath);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; //combining filename with current datetime to guarantee a unique name
    cb(null, uniqueName);
  },
});

// Helper function to get relative paths for image and docs
const getRelativePath = (absolutePath, fileType) => {
  if (fileType === "image") {
    return path.relative("public", path.join(imagesBasePath, absolutePath));
  } else if (fileType === "document") {
    return path.relative("public", path.join(documentsBasePath, absolutePath));
  }
};

const upload = multer({ storage });
module.exports = { upload, getRelativePath };
