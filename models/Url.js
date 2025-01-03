const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: [true, "Must provide a URL"],
    trim: true,
  },
  urlCode: {
    type: String,
    unique: true,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", UrlSchema);
