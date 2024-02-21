const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedin,
  isReviewAuthor,
} = require("../middleware.js");

const { createReview, deleteReview } = require("../controllers/reviews.js");

//Create Reviews
router.post("/", isLoggedin, validateReview, wrapAsync(createReview));
//Delete Indivisual Reviews
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(deleteReview)
);

module.exports = router;
