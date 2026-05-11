import multer from "multer";

const storage = multer.memoryStorage();
const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if(allowedTypes.includes(file.mimetype)){
      console.log("File type is allowed:", file.mimetype);
      cb(null, true);
    }
    else {
      console.log("File type is not allowed:", file.mimetype);
      cb(new Error("Only image files are allowed"));
    }
  }
})
