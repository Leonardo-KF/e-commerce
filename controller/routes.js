const express = require("express");
const route = express.Router();
const multer = require("multer");
let fs = require("fs");
const produtos = require(".././model/produtos");
const users = require(".././model/users");
const msgErro = "Usuario ou senha incorreto!";
const msgUser = "Este email já foi cadastrado! Por favor tente novamente";
const msgCad = "Produto cadastrado com sucesso";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views/public/img/");
  },
  filename: async function (req, file, cb) {
    const produtos1 = await produtos.findAll();
    const extensaoArquivo = file.originalname.split(".")[1];
    const novoNomeArquivo = produtos1.length + 1;
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

const upload = multer({ storage });

route.get("/", async (req, res) => {
  const items = await produtos.findAll();
  res.render("index", { items: items, msg: "" });
});

route.get("/dashboard", async (req, res) => {
  const items = await produtos.findAll();
  res.render("dashboard", { items: items, msg: "" });
});

route.get("/cadastro", function (req, res) {
  res.render("cadastro", { msg: "" });
});

route.post("/cadastro", async (req, res) => {
  const { nome_completo, telefone, email, senha } = req.body;
  const user = await users.findAll({
    email: email,
  });
  if (!nome_completo) {
    res.render("/cadastro", { msg: "Nome é obrigatório!! " });
  }
  if (!email) {
    res.render("/cadastro", { msg: "Email é obrigatório! " });
  }
  if (!senha) {
    res.render("/cadastro", { msg: "Senha é obrigatório!" });
  }
  if (user[0] === undefined) {
    const user1 = await users.create({
      nome: nome_completo,
      telefone: telefone,
      email: email,
      senha: senha,
    });
  } else {
    res.redirect("/cadastro", { msg: msgUser });
  }

  res.redirect("/login");
});

route.get("/login", function (req, res) {
  res.render("login", { msg: "" });
});

route.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const login = await users.findAll({
    where: { email: email, senha: senha },
  });
  if (login[0].email == "admin@admin" && login[0].senha == "admin") {
    res.redirect("/dashboard");
  } else if (login[0] != undefined) {
    res.redirect("/");
  } else {
    res.redirect("/login", { msg: msgErro });
  }
});

route.get("/cdp", function (req, res) {
  res.render("cadastro_de_produtos", { msg: "" });
});

route.post("/cdp", upload.single("file"), async (req, res) => {
  const { nome, preco, descricao } = req.body;
  const img = req.file.filename;
  if (!nome) {
    res.render("/cdp", { msg: "Nome é obrigatório!" });
  }
  if (!preco) {
    res.render("/cdp", { msg: "Preco é obrigatório!" });
  }
  if (!descricao) {
    res.render("/cdp", { msg: "descricao é obrigatório!" });
  }
  if (!img) {
    res.render("/cdp", { msg: "Imagem é obrigatória!" });
  }
  const produto = await produtos.create({
    nome: nome,
    img: img,
    preco: preco,
    descricao: descricao,
  });
  res.redirect("/dashboard", { msg: msgCad });
});

route.get("/update/:id", async (req, res) => {
  const produto = await produtos.findByPk(req.params.id);
  if (!produto) {
    res.render("update", { msg: "produto não encontrado! " });
  }
  res.render("update", {
    produto,
  });
});

route.post("/update/:id", upload.single("file"), async (req, res) => {
  const produto = await produtos.findByPk(req.params.id);
  const { nome, preco, descricao } = req.body;
  const img = req.file.filename;
  if (!nome) {
    res.render("/cdp", { msg: "Nome é obrigatório!" });
  }
  if (!preco) {
    res.render("/cdp", { msg: "Preco é obrigatório!" });
  }
  if (!descricao) {
    res.render("/cdp", { msg: "descricao é obrigatório!" });
  }
  if (!img) {
    res.render("/cdp", { msg: "Imagem é obrigatória!" });
  }

  produto.nome = nome;
  produto.img = img;
  produto.preco = preco;
  produto.descricao = descricao;

  await produto.save();

  res.redirect("/dashboard", { msg: "Produto atualizado com sucesso!" });
});

route.get("/deletar/:id", async (req, res) => {
  const produto = await produtos.findByPk(req.params.id);
  if (!produto) {
    res.redirect("/dashboard", { msg: "Não foi possivel deletar o produto!" });
  }
  await filme.destroy();

  res.redirect("/dashboard", { msg: "Produto deletado com sucesso!" });
});

module.exports = route;
