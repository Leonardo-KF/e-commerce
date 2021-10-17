const express = require("express");
const app = express();
const path = require("path");
const produtos = require("./model/produtos.js");
const db = require("./model/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views/public")));
app.set("view engine", "ejs");

db.conectado();
app.listen(3000);
