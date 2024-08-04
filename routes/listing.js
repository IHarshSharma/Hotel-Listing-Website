const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

const {
  isLoggedIn,
  isOwner,
  validateListing,
  saveRedirectUrl,
} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// New Route
router.get(
  "/new",
  isLoggedIn,
  saveRedirectUrl,
  listingController.renderNewForm
);

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  saveRedirectUrl,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
