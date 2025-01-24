const multer = require("multer");
const path = require("path");

const imagesBasePath = "public/fundraiserImages";
const documentsBasePath = "public/fundraiserDocuments";

//Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "image") {
      cb(null, path.join(__dirname, `../../${imagesBasePath}`));
    } else if (file.fieldname == "document") {
      cb(null, path.join(__dirname, `../../${documentsBasePath}`));
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
