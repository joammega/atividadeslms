let button = document.querySelector(".open");
let menu = document.querySelector(".menu");
let conteudo = document.querySelector(".conteudo");

button.addEventListener("click", function(){
    menu.classList.toggle("change");
    conteudo.classList.toggle("change");
})