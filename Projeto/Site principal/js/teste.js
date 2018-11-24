let quests = document.querySelectorAll(
  ".conteiner .conteudo .quadro .quest .caixa ul"
);

for (let i of quests) {
  for (let j = 0; j < i.children.length; j++) {
    i.children[j].addEventListener("click", function() {
      i.children[0].classList.remove("marcado");
      i.children[1].classList.remove("marcado");
      i.children[2].classList.remove("marcado");
      i.children[3].classList.remove("marcado");
      i.children[j].classList.add("marcado");
    });
  }
}
