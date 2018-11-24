function getUser() {
  let url = "http://localhost:3000/users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      for (let i of parsed) {
        if (localStorage.getItem("user") == i.username) {
          novomenu(i.username);
        } else {
          alert("Você não está logado");
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

  lista.appendChild(li);
}

getUser();
