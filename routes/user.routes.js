const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const uploadUsingMulter = require("../utils/multerConfig");
const bookingcontroller = require("../controllers/booking.controller");


router.post("/signup", userController.signup);
router.post("/verifyOtp/:otp", userController.verifyOtp);

router.get("/getuser", authController.protect, userController.getUser);
router.patch(
  "/updateUser",
  authController.protect,
  uploadUsingMulter.uploadUserPhotos,
  userController.updateUser
);
router.delete("/deleteUser", authController.protect, userController.deleteUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logout);
router.post("/forgetPassword", userController.forgetPassword);
router.patch("/resetPassword/:token", userController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  userController.updatePassword
);

module.exports = router;
