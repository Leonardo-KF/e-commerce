const el = document.querySelector(".home-section .modelo-area .models-produto");
const as = document.querySelectorAll(".allas");

as.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    const popup = document.getElementById("w" + element.id);
    const bot = document.getElementById("voltarflex" + element.id);
    popup.style.opacity = 0;
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 200);
    bot.addEventListener("click", () => {
      popup.style.opacity = 1;
      setTimeout(() => {
        popup.style.opacity = 0;
      }, 200);
      popup.style.display = "none";
    });
  });
});
