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
      setTimeout(() => {
        popup.style.opacity = 0;
        popup.style.display = "none";
      }, 200);
    });
  });
});

const closeMessage = document.querySelector("#close");
const message = document.querySelector("#msg");
closeMessage.addEventListener("click", function () {
  message.style.display = "none";
});
setTimeout(() => {
  message.style.display = "none";
}, 5000);
