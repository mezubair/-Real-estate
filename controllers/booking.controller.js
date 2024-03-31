const Booking = require("../models/booking.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

exports.createBooking = catchAsync(async (req, res, next) => {
  const propertyId = req.params.id;
  const userId = req.user.id;
  const newBooking = await Booking.create({
    propertyId,
    userId,
  });
  const message = `${req.user.name} has requested for a booking, click here to accept: 127.0.0.1:8000/api/v1/seller/confirmbooking/${newBooking._id}"`;
  await sendEmail({
    email: "temp",
    subject: "booking request",
    message,
  });
  res.status(201).json({
    status: "success",
    data: {
      booking: newBooking,
    },
  });
});

exports.getPendingBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ status: "pending" });
  if (bookings.length < 1) {
    return next(new AppError("There are no pending bookings", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});
