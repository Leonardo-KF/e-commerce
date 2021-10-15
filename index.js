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
  res.render("detalhes_produto");
});
app.post("/cadastro", function (req, res) {
  res.redirect("index");
});
app.get("/Login", function (req, res) {
  res.render("/");
});
app.listen(3000);
