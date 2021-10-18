const express = require("express");
const route = express.Router();
const produtos = require(".././model/produtos");
const users = require(".././model/users");
const msgErro = "Usuario ou senha incorreto!";
const msgUser = "Este email já foi cadastrado! Por favor tente novamente";

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
  const user = await users.findAll({
    email: email,
  });
  if (user[0] === undefined) {
    const user1 = await users.create({
      nome: nome_completo,
      telefone: telefone,
      email: email,
      senha: senha,
    });
  } else {
    res.render("/cadastro", { msg: msgUser });
  }

  res.redirect("/login");
});
route.get("/login", function (req, res) {
  res.render("login");
});

route.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const login = await users.findAll({
    where: { email: email, senha: senha },
  });

  if (login[0] == 0) {
    // verificar com o professor para catar um usuario no banco
    res.redirect("/dashboard");
  } else if (login[0] != undefined) {
    res.redirect("/");
  } else {
    res.redirect("/login", { msg: msgErro });
  }
});

route.get("/carrinho", function (req, res) {
  res.render("carrinho");
});

module.exports = route;
