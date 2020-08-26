const router = require("express").Router();
const Review = require("../models/Review");

router.get("/reviews", (req, res, next) => {
  Review.find({}, (err, reviews) => {
    if (err) next(err);
    else res.json(reviews);
  });
});

router.post("/reviews", (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const { title, variety, winery, points, price, taster } = req.body;
  const newReview = new Review({
    title: title,
    variety: variety,
    winery: winery,
    points: points,
    price: price,
    taster: taster,
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
      points: x,
      price: x,
      taster: "test",
    });
    await newReview.save();
  }
  res.send(
    "Lets run the GET after this to see if the thoughts got seeded successfully  "
  );
});

router.put("/reviews", (req, res, next) => {
  const { id } = req.params;
  const { title, variety, winery, points, price, taster } = req.body;
  Review.findOne({ id })
    .then((review) => {
      (review.title = title),
        (review.variety = variety),
        (review.winery = winery),
        (review.points = points),
        (review.price = price),
        (review.taster = taster),
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
