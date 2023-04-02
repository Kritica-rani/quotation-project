const express = require("express");
const port = 500;
const app = express();
const db = require("./config/mongoose");
const routes = require("./routes/index");

// middleware
app.use(express.urlencoded());
app.use("/", routes);

app.listen(port, (err) => {
  if (err) {
    console.log("err");
    return;
  }
  console.log("server is up and runnong");
});
