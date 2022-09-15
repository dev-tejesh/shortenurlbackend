const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    longUrl:{

        type:String,
        required:[true,'must provide url'],
        trim:true,
    },
    urlCode:String,
    shortUrl:String,
    clicks:{
        type:Number,
        default:0,
        required:true,
    },
    date: { type: String, default: Date.now }
});

module.exports = mongoose.model("Url", UrlSchema);
