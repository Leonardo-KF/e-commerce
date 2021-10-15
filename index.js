const express = require("express");

const app = express();
require("dotenv").config();
const db = require("./model/database");
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/detalhes", function (req, res) {
  res.render("Detalhes_produto");
});
app.post("/cadastro", function (req, res) {
  res.redirect("index");
});

app.listen(3000);
