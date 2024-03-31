const multer = require("multer");

// Storage for user images
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user-images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `user-${uniqueSuffix}.${ext}`);
  },
});

// Storage for Property photos
const propertyPhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, "./uploads/property-images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e8);
    cb(null, `post-${uniqueSuffix}.${ext}`);
  },
});


// MulterFilter for Photos
const multerFilter = (req, file, cb) => {
  console.log(req.body);

  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"), false);
  }
};

// User Image
const uploadUser = multer({
  storage: userStorage,
  fileFilter: multerFilter,
});

// Property Images
const uploadProperty = multer({
  storage: propertyPhotoStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhotos = uploadUser.single("photo");
exports.uploadPropertyPhotos = uploadProperty.array("images", 10);
