const catchAsync = require("../utils/catchAsync");
const Property = require("../models/property.model");
const Booking = require("../models/booking.model");
const sendEmail = require("../utils/email");

exports.addProperty = catchAsync(async (req, res, next) => {
  const { title, description, location, price, type } = req.body;
  console.log(req.body);
 
  const images = req.files.map((file) => file.path);


  const newProperty = new Property({
    title,
    description,
    location,
    price,
    type,
    images,
  });

  await newProperty.save();
  res.status(201).json({
    status: "success",
    message: "Property added successfully",
    property: newProperty,
  });
});

exports.deleteProperty = catchAsync(async (req, res, next) => {
  const propertyId = req.params.id;
  const deletedProperty = await Property.findByIdAndDelete(propertyId);

  res.status(204).json({
    status: "success",
    message: "The property has been deleted",
  });
});

exports.acceptPropertyVisit = catchAsync(async (req, res, next) => {
  const bookingID = await Booking.findById(req.params.id);
  const updatedBooking = await Booking.findByIdAndUpdate(bookingID, req.body, {
    new: true,
    runValidators: true,
  });


  const message = `your request is accepted.kindly visit the requested location on ${updatedBooking.visitDate} at ${updatedBooking.visitTime}. `;
  await sendEmail({
    email: "realestate@support.com",
    subject: "booking request",
    message,
  });
  res.status(200).json({
    status: "success",
    data: {
      booking: updatedBooking,
    },
  });
});
