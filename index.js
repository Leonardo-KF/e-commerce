const express = require("express");
const app = express();
const port = process.env.PORT;
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(3000);
