import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures",
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "image",
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error = new Error("Only jpg, jpeg, and png files are allowed");
    error.statusCode = 400;
    return cb(error);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
