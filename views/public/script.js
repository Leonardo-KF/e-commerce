const el = document.querySelector(".home-section .modelo-area .models-produto");
const as = document.querySelectorAll(".allas");
const c = (elemt) => document.querySelector(elemt);

as.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    c(".modelsWindowArea").style.display = "flex";
  });
});
