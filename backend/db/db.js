require("dotenv").config();
const mongoose = require('mongoose');
const mongoURI = process.env.DB_URL;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGO DB");
  })
  .catch((err) => {
    console.error("ERROR WHILE CONNECTING TO DB", err);
  });
