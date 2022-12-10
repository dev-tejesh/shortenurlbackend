const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const { shortenUrl, getShortenUrl } = require("../controllers/urls");
router.route("/").post(shortenUrl);
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    // const count = await Url.findOne({ clicks });
    console.log(url);
    if (url) {
      url.clicks++;
      url.save();

      console.log(url.clicks);

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});
module.exports = router;
