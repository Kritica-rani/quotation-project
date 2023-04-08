const mongoose = require("mongoose");
const URI =
  "mongodb+srv://kritica:1234@cluster0.ijhpt7v.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("mongodb is up and connected"))
  .catch((error) => console.log("error in mongodb", error));
