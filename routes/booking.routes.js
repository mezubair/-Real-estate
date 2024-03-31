const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const propertyController = require("../controllers/property.controller");

router.get(
  "/getAllProperties",
  authController.protect,
  propertyController.getAllProperties
);

module.exports = router;
