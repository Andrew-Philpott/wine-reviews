const router = require("express").Router();
const Review = require("./Review");

router.get("/reviews", (req, res, next) => {
  Review.find({}, (err, reviews) => {
    if (err) next(err);
    else res.json(reviews);
  });
});

router.post("/reviews", (req, res, next) => {
  const { title, variety, winery, rating, price, taster, country } = req.body;
  const newReview = new Review({
    title: title,
    variety: variety,
    winery: winery,
    rating: rating,
    price: price,
    taster: taster,
    country: country,
  });
  newReview.save((err) => {
    if (err) next(err);
    else res.json(newReview);
  });
});

router.post("/seed", async (req, res, next) => {
  for (let x = 0; x < 3; x++) {
    const newReview = new Review({
      title: "test",
      variety: "test",
      winery: "test",
      rating: x,
      price: x,
      taster: "test",
      country: "test",
    });
    await newReview.save();
  }
  res.send(
    "Lets run the GET after this to see if the thoughts got seeded successfully  "
  );
});

router.put("/reviews", (req, res, next) => {
  const { id } = req.params;
  const { title, variety, winery, rating, price, taster } = req.body;
  Review.findOne({ id })
    .then((review) => {
      (review.title = title),
        (review.variety = variety),
        (review.winery = winery),
        (review.rating = rating),
        (review.price = price),
        (review.taster = taster),
        (review.country = country);
      review.save().then(res.json(review));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("reviews/:id", (req, res) => {
  Review.findOneAndRemove({ id })
    .then((review) => {
      res.json(review);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
