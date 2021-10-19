const produtos = require(".././model/produtos");
const items = await produtos.findAll();

const dados = document.querySelector(".produtos");
const dados1 = document.querySelectorAll(el);

items.map((item, index) => {
  let modelsItem = document
    .querySelector(".models .models-produto")
    .cloneNode(true);
  document.querySelector(".modelo-area").append(modelsItem);
});
