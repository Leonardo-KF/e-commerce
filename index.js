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

app.listen(3000);
