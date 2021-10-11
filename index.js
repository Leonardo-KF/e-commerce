const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(3000);
