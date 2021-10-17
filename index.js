const express = require("express");
const app = express();
const Sequelize = require("sequelize");
require("dotenv").config();
const db = require("./model/database");
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/detalhes", function (req, res) {
  res.render("detalhes_produto");
});
app.get("/cadastro", function (req, res) {
  res.render("cadastro");
});
app.post("/cadastro", function (req, res) {
  const { nome_completo, nome_login, senha, email, telefone } = req.body;
  const login = {
    nome: nome_completo,
    login: nome_login,
    senha: senha,
    email: email,
    telefone: telefone,
  };
  res.redirect("/");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/carrinho", function (req, res) {
  res.render("carrinho");
});

app.listen(3000);
