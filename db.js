const mongoose = require("mongoose");

const MONGODBURI = "mongodb://localhost/devtt";

mongoose
  .connect(MONGODBURI)
  .then((res) => {
    console.log("Connected to DataBase");
  })
  .catch((error) => {
    console.log("Failed to Connect to database");
  });
