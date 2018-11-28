function getUser() {
  let url = "http://localhost:3000/users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      for (let i of parsed) {
        if (localStorage.getItem("user") == i.username) {
          novomenu(i.username);
        }
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function novomenu(nome) {
  let lista = document.querySelector(".parte1 .cabecalho .nav ul");

  lista.innerHTML = "";

  let li = document.createElement("li");
  let a = document.createElement("a");

  a.href = "./ansiedade.html";

  let a_texto = document.createTextNode("Ansiedade");

  a.appendChild(a_texto);
  li.appendChild(a);

  lista.appendChild(li);

  li = document.createElement("li");
  a = document.createElement("a");

  a.href = "./estresse.html";

  a_texto = document.createTextNode("Estresse");

  a.appendChild(a_texto);
  li.appendChild(a);

  lista.appendChild(li);

  li = document.createElement("li");
  a = document.createElement("a");

  a.href = "./calendario.html";

  a_texto = document.createTextNode("Calendario");

  a.appendChild(a_texto);
  li.appendChild(a);

  lista.appendChild(li);

  li = document.createElement("li");
  a = document.createElement("a");

  a.href = "./page_teste.html";

  a_texto = document.createTextNode("Teste");

  a.appendChild(a_texto);
  li.appendChild(a);

  lista.appendChild(li);

  li = document.createElement("li");
  li_texto = document.createTextNode(nome);

  li.classList.add("user");

  let div = document.createElement("div");
  div.classList.add("botao");
  div.appendChild(li_texto);
  li.appendChild(div);

  div = document.createElement("div");
  div.classList.add("opcoes");

  let ul = document.createElement("ul");
  let liaux = document.createElement("li");
  a = document.createElement("a");
  a.href = "./perfil.html";
  a_texto = document.createTextNode("Perfil");

  a.appendChild(a_texto);
  liaux.appendChild(a);
  ul.appendChild(liaux);

  liaux = document.createElement("li");
  a = document.createElement("a");
  a.href = "./index.html";
  a_texto = document.createTextNode("Sair");

  a.addEventListener("click", function() {
    localStorage.setItem("user", "");
  });
  a.appendChild(a_texto);
  liaux.appendChild(a);
  ul.appendChild(liaux);

  div.appendChild(ul);
  li.appendChild(div);

  lista.appendChild(li);
}
let nav = document.querySelector(".parte1 .cabecalho .nav");
window.addEventListener("scroll", function() {
  if (this.window.pageYOffset > 10) {
    nav.classList.add("scroll");
  } else {
    nav.classList.remove("scroll");
  }
});
getUser();
