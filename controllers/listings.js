const Listing = require("../models/litening");

module.exports.index = async (req, res) => {
  const data = await Listing.find();
  res.render("Listing/Listing.ejs", { data });
};

module.exports.renderNewForm = (req, res) => {
  res.render("Listing/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listing");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!data) {
    req.flash("error", "Listing that you requested doesn't exist in database");
    res.redirect("/listing");
  }
  res.render("Listing/show.ejs", { data });
};

module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id);
  if (!data) {
    req.flash("error", "Listing that you requested doesn't exist in database");
    res.redirect("/listing");
  }
  res.render("Listing/edit.ejs", { data });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const data = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing update successfully");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted Successfully");
  res.redirect("/listing");
};
