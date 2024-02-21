const express = require("express");
const router = express.Router();
const multer = require("multer");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  renderNewForm,
  showListing,
  createListing,
  editListingForm,
  editListing,
  deleteListing,
} = require("../controllers/listings.js");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListing)
  );

// new Listing
router.get("/new", isLoggedin, renderNewForm);

//Show card details
router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(isLoggedin, isOwner, validateListing, wrapAsync(editListing))
  .delete(isLoggedin, isOwner, wrapAsync(deleteListing));

router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(editListingForm));

module.exports = router;
