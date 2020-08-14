const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  country: String,
  title: String,
  variety: String,
  winery: String,
  points: Number,
  price: Number,
  taster: String,
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;