const el = document.querySelector(".home-section .modelo-area .models-produto");
const as = document.querySelectorAll(".allas");
const popup = document.getElementById("window-area");
const c = (elemt) => document.querySelector(elemt);

as.forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log("rodou");
    e.preventDefault();
    popup.style.opacity = 0;
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 200);
  });
});
