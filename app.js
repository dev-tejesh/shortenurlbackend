const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const urls = require("./routes/urls.js");
const cors = require('cors');
// const urls= require("./routes/urls.js");
app.use(cors({ origin: '*' }))
require('dotenv').config()

// app.use(express.static('./public'))
app.use(express.json())


app.use("/api/v1/urls", urls);
const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("server is listening " + port));
  } catch(error){
    console.log(error)
  }
};
start()