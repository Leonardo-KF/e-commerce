const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views/public")));
app.set("view engine", "ejs");

app.listen(3000);
