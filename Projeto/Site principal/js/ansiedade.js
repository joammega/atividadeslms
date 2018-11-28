let setadir = document.querySelector(".setadir");
let setaesq = document.querySelector(".setaesq");
let slides = document.querySelectorAll(".slide");
let barra = document.querySelector(".barra");
let unidade = 100 / slides.length;

barra.style.width = unidade - 5 + "%";

setadir.addEventListener("click", function() {
  for (let i = 0; i < slides.length; i++) {
    if (!slides[i].classList.contains("ativo")) {
      slides[i].classList.add("ativo");
      barra.style.width = (i + 1) * unidade - 5 + "%";
      break;
    }
  }
});
setaesq.addEventListener("click", function() {
  for (let i = slides.length - 1; i != 0; i--) {
    if (slides[i].classList.contains("ativo")) {
      if (i != 0) {
        slides[i].classList.remove("ativo");
        barra.style.width = i * unidade - 5 + "%";
        break;
      }
    }
  }
});
