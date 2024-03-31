const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const seedAdmin = catchAsync(async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    const newAdmin = new User({
      name: "zubair",
      email: "zubair@gmail.com",
      password: "000000000",
      passwordConfirm: "000000000",
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin user created successfully.");
  } else {
    console.log("Admin already exists.");
  }
});
seedAdmin();

