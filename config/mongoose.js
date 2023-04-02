const mongoose = require("mongoose");

mongoose
  .connect(URI)
  .then(() => console.log("mongodb is up and connected"))
  .catch((error) => console.log("error in mongodb", error));
