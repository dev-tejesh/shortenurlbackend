const Url = require("../models/Url");
const validUrl = require("valid-url");
const shortid = require("shortid");

// Base URL for short URLs (use environment variable)
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

// Shorten URL Controller
const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  // Validate long URL
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: "Invalid long URL" });
  }

  try {
    // Check if URL already exists
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.status(200).json(url);
    }

    // Create new shortened URL
    const urlCode = shortid.generate();
    const shortUrl = `${BASE_URL}/${urlCode}`;

    url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      clicks: 0,
    });

    await url.save();
    return res.status(201).json(url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Redirect Controller
const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });

    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get Click Count Controller (Optional Feature)
const getClickCount = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });

    if (url) {
      return res.status(200).json({ clicks: url.clicks });
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  getClickCount,
};
