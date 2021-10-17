const express = require("express");
const route = express.Router();
const logins = require(".././model/logins");
const produtos = require(".././model/produtos");
const users = require(".././model/users");

route.get("/", function (req, res) {
  res.render("index");
});
route.get("/detalhes", function (req, res) {
  res.render("detalhes_produto");
});
route.get("/cadastro", function (req, res) {
  res.render("cadastro");
});
route.post("/cadastro", function (req, res) {
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
route.get("/login", function (req, res) {
  res.render("login");
});
route.get("/carrinho", function (req, res) {
  res.render("carrinho");
});
