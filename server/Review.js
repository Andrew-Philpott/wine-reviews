const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  country: String,
  title: String,
  variety: String,
  winery: String,
  rating: Number,
  price: Number,
  taster: String,
  country: String,
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
