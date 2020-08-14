const router = require("express").Router();
const Review = require("../models/Review");

router.get("/reviews", (req, res, next) => {
  Review.find({}, (err, reviews) => {
    if (err) next(err);
    else res.json(reviews);
  });
});

router.post("/reviews", async (req, res, next) => {
  const { title, variety, winery, points, price, taster } = req.body;
  const newReview = new Review({
    title: title,
    variety: variety,
    winery: winery,
    points: points,
    price: price,
    taster: taster,
  });
  newReview.save(err => {
    if (err) next(err);
    else res.json(newReview);
  })
});

router.put("/reviews", (req, res, next) => {
  const { id } = req.params;
  const { title, variety, winery, points, price, taster } = req.body;
  Review.findOne({ id }).then(review => {
    review.title = title,
      review.variety = variety,
      review.winery = winery,
      review.points = points,
      review.price = price,
      review.taster = taster,
      review.save().then(res.json(review));
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.delete("reviews/:id", (req, res) => {
  Review.findOneAndRemove({ id }).then(review => {
    res.json(review);
  }).catch(err => {
    res.status(500).send(err);
  });
});

module.exports = router;