const mongoose = require("mongoose");
const Review = require("./review.js");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    default: 2500,
  },
  location: {
    type: String,
  },
  Country: {
    type: String,
    default: "India",
  },
  image: {
    filename: {
      type: String,
      default: "image",
    },
    url: {
      type: String,
      default:
        "https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg",
    },
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
