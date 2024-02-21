const Listing = require("../models/litening");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newRev = new Review(req.body.review);
  newRev.author = req.user._id;
  listing.reviews.push(newRev);
  await newRev.save();
  await listing.save();
  req.flash("success", "Review Added successfully!!");

  res.redirect(`/listing/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!!");
  res.redirect(`/listing/${id}`);
};
