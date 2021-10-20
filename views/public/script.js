async () => {
  const produtos = await axios.get("http://localhost:3000/info");
  const produto = produtos.data;
  console.log(produto);
};

const el = document.querySelector(".home-section .modelo-area .models-produto");
const as = document.querySelectorAll(".allas");
const c = (elemt) => document.querySelector(elemt);

as.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(element.id);
    const popup = document.getElementById("w" + element.id);
    popup.style.opacity = 0;
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 200);
  });
});
