const express = require("express");
const router = express.Router();

const {
  shortenUrl,
  redirectUrl,
  getClickCount,
} = require("../controllers/urls");

// Shorten a URL
router.post("/", shortenUrl);

// Redirect to the long URL
router.get("/:code", redirectUrl);

// Get the click count (Optional)
router.get("/:code/stats", getClickCount);

module.exports = router;
