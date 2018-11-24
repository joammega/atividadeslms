let conteiner = document.querySelector(".conteiner");
let pages = conteiner.children;
let linhas = document.querySelectorAll(".linha");
window.addEventListener("scroll", function() {
  console.log(window.pageYOffset + window.innerHeight);
  console.log(pages[0].offsetHeight);
  if (window.pageYOffset == 0) {
    for (let i of linhas) {
      i.style.width = "0%";
    }
    for (let i of pages) {
      i.style.color = "transparent";
    }
    pages[0].style.color = "white";
  }
  if (window.pageYOffset + window.innerHeight - 100 > pages[0].offsetHeight) {
    linhas[0].style.width = "30%";
    pages[1].style.color = "black";
  }
  if (
    window.pageYOffset + window.innerHeight - 100 >
    pages[0].offsetHeight + pages[1].offsetHeight
  ) {
    linhas[1].style.width = "30%";
    pages[2].style.color = "white";
  }
  if (
    window.pageYOffset + window.innerHeight - 100 >
    pages[0].offsetHeight + pages[1].offsetHeight + pages[2].offsetHeight
  ) {
    linhas[2].style.width = "30%";
    linhas[3].style.width = "30%";
    pages[3].style.color = "black";
  }
  if (
    window.pageYOffset + window.innerHeight - 100 >
    pages[0].offsetHeight +
      pages[1].offsetHeight +
      pages[2].offsetHeight +
      pages[3].offsetHeight
  ) {
    linhas[4].style.width = "30%";
    pages[4].style.color = "white";
  }
  if (
    window.pageYOffset + window.innerHeight - 100 >
    pages[0].offsetHeight +
      pages[1].offsetHeight +
      pages[2].offsetHeight +
      pages[3].offsetHeight +
      pages[4].offsetHeight
  ) {
    linhas[5].style.width = "30%";
    pages[5].style.color = "black";
  }
});
let conteudo = document.querySelectorAll(".parte2 .texto .conteudo");
let setaesq = document.querySelector(".parte2 .texto .setaesq");
let setadir = document.querySelector(".parte2 .texto .setadir");

let local = 0;

setaesq.addEventListener("click", function() {
  conteudo[local].classList.remove("ativo");
  if (local == 0) {
    local = 2;
  } else {
    local -= 1;
  }
  conteudo[local].classList.add("ativo");
});

setadir.addEventListener("click", function() {
  conteudo[local].classList.remove("ativo");
  if (local == 2) {
    local = 0;
  } else {
    local += 1;
  }
  conteudo[local].classList.add("ativo");
});
