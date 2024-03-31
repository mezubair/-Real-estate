const mongoose = require("mongoose");
const User = require("./user.model");
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  images: [
    {
      type: String,
      // required: true,
      default: "default.jpg",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["sell", "rent"],
  },
  video: {
    type: String,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
