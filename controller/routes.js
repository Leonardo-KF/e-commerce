const express = require("express");
const route = express.Router();
const logins = require(".././model/logins");
const produtos = require(".././model/produtos");
const users = require(".././model/users");

route.get("/", async (req, res) => {
  const items = await produtos.findAll();
  res.render("index", { items: items });
});
route.get("/detalhes", function (req, res) {
  res.render("detalhes_produto");
});
route.get("/cadastro", function (req, res) {
  res.render("cadastro");
});
route.post("/cadastro", async (req, res) => {
  const { nome_completo, telefone, email, senha } = req.body;
  const user = await users.create({
    nome: nome_completo,
    telefone: telefone,
    email: email,
    senha: senha,
  });
  res.redirect("/login");
});
route.get("/login", function (req, res) {
  res.render("login");
});
route.get("/carrinho", function (req, res) {
  res.render("carrinho");
});

module.exports = route;
