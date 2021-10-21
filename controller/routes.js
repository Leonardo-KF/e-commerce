const express = require("express");
const route = express.Router();
const multer = require("multer");
const fs = require("fs");
const produtos = require(".././model/produtos");
const users = require(".././model/users");
let msg = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views/public/img/");
  },
  filename: async function (req, file, cb) {
    const produtos1 = await produtos.findAll();
    const extensaoArquivo = file.originalname.split(".")[1];
    const novoNomeArquivo = Date.now();
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

const upload = multer({ storage });

route.get("/", async (req, res) => {
  const items = await produtos.findAll();
  setTimeout(() => {
    msg = "";
  }, 1000);
  res.render("index", { items: items, msg: msg });
});

route.get("/dashboard", async (req, res) => {
  const items = await produtos.findAll();
  setTimeout(() => {
    msg = "";
  }, 1000);
  res.render("dashboard", { items: items, msg: msg });
});

route.get("/cadastro", function (req, res) {
  setTimeout(() => {
    msg = "";
  }, 1000);
  res.render("cadastro", { msg: msg });
});

route.post("/cadastro", async (req, res) => {
  const { nome_completo, telefone, email, senha } = req.body;
  const user = await users.findAll({
    email: email,
  });
  if (!nome_completo) {
    res.render("cadastro", { msg: "Nome é obrigatório!! " });
  }
  if (!email) {
    res.render("cadastro", { msg: "Email é obrigatório! " });
  }
  if (!senha) {
    res.render("cadastro", { msg: "Senha é obrigatório!" });
  }
  if (user[0] === undefined) {
    const user1 = await users.create({
      nome: nome_completo,
      telefone: telefone,
      email: email,
      senha: senha,
    });
  } else {
    res.render("cadastro", { msg: msg });
  }

  res.redirect("/login");
});

route.get("/login", function (req, res) {
  res.render("login", { msg: msg });
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
    res.render("login", { msg: msg });
  }
});

route.get("/cdp", function (req, res) {
  setTimeout(() => {
    msg = "";
  }, 1000);
  res.render("cadastro_de_produtos", { msg: msg });
});

route.post("/cdp", upload.single("file"), async (req, res) => {
  const { nome, preco, descricao } = req.body;
  const img = req.file.filename;
  if (!nome) {
    res.render("cadastro_de_produtos", { msg: "Nome é obrigatório!" });
  }
  if (!preco) {
    res.render("cadastro_de_produtos", { msg: "Preco é obrigatório!" });
  }
  if (!descricao) {
    res.render("cadastro_de_produtos", { msg: "descricao é obrigatório!" });
  }
  if (!img) {
    res.render("cadastro_de_produtos", { msg: "Imagem é obrigatória!" });
  }
  const produto = await produtos.create({
    nome: nome,
    img: img,
    preco: preco,
    descricao: descricao,
  });
  msg = "Produto cadastrado com sucesso!";
  res.redirect("/dashboard");
});

route.get("/update/:id", async (req, res) => {
  const produto = await produtos.findByPk(req.params.id);
  if (!produto) {
    res.render("update", { msg: "produto não encontrado! " });
  }
  res.render("update", { msg: msg, produto });
});

route.get("/dashboard", function (req, res) {
  res.render("dashboard");
});

route.post("/update/:id", upload.single("file"), async (req, res) => {
  const produto = await produtos.findByPk(req.params.id);
  const { nome, preco, descricao } = req.body;
  const img = req.file.filename;
  if (!nome) {
    res.render("update/:" + req.params.id, { msg: "Nome é obrigatório!" });
  }
  if (!preco) {
    res.render("update/:" + req.params.id, { msg: "Preco é obrigatório!" });
  }
  if (!descricao) {
    res.render("update/:" + req.params.id, { msg: "descricao é obrigatório!" });
  }
  if (!img) {
    res.render("update/:" + req.params.id, { msg: "Imagem é obrigatória!" });
  }

  produto.nome = nome;
  produto.img = img;
  produto.preco = preco;
  produto.descricao = descricao;

  await produto.save();
  msg = "Produto atualizado com sucesso!";
  res.redirect("/dashboard");
});

route.get("/deletar/:id", async (req, res) => {
  const produto = await produtos.findByPk(req.params.id);

  if (!produto) {
    res.render("dashboard", { msg: "Não foi possivel deletar o produto!" });
  }
  await produto.destroy();
  msg = "Produto deletado com sucesso!";
  res.redirect("/dashboard");
});

module.exports = route;
