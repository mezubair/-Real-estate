const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const uploadUsingMulter = require("../utils/multerConfig");
const bookingController = require("../controllers/booking.controller");
const sellercontroller = require("../controllers/admin-controller");

router.post(
  "/addproperty",
  authController.protect,
  authController.checkAdmin,
  uploadUsingMulter.uploadPropertyPhotos,
  sellercontroller.addProperty
);

router.delete(
  "/deleteproperty/:id",
  authController.protect,
  authController.checkAdmin,
  sellercontroller.deleteProperty
);
router.get(
  "/getpendingbookings",
  authController.protect,
  authController.checkAdmin,
  bookingController.getPendingBookings
);
router.patch(
  "/confirmbooking/:id",
  authController.protect,
  authController.checkAdmin,
  sellercontroller.acceptPropertyVisit
);
module.exports = router;
