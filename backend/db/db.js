require("dotenv").config();
const mongoose = require('mongoose');
const mongoURI = process.env.DB_URL;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error while connecting to Database", err);
  });
