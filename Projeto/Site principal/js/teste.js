let quests = document.querySelectorAll(
  ".conteiner .conteudo .quadro .quest .caixa ul"
);
let id = "";
let user = "";
if (
  localStorage.getItem("user") != "" &&
  localStorage.getItem("user") != null
) {
  user = localStorage.getItem("user");
} else {
  user = "anonimo";
}
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

let enviar = document.querySelector(
  ".conteiner .conteudo .quadro .button button"
);
enviar.addEventListener("click", function() {
  contabilizar();
});
function contabilizar() {
  let cont = 0;
  for (let i of quests) {
    for (let j = 0; j < i.children.length; j++) {
      if (i.children[j].classList.contains("marcado")) {
        cont += j;
        console.log("oi");
        break;
      } else if (j == 3) {
        alert("você esqueceu de marcar alguma questão");
        return;
      }
    }
  }
  postresult(cont);
  getresult();
}
let conteudo = document.querySelector(".conteiner .conteudo");
let quadro = document.querySelector(".conteiner .conteudo .quadro");
function resultado(resultado) {
  quadro.innerHTML = "";

  let card = document.createElement("div");
  card.classList.add("card");

  let img = document.createElement("img");

  img.src = "./imgs/" + resultado + ".png";

  card.appendChild(img);
  let div = document.createElement("div");
  div.classList.add("resposta");
  let h4 = document.createElement("h4");
  let h4_text = "";

  let p = document.createElement("p");
  let p_text = "";
  if (resultado == 0) {
    h4_text = document.createTextNode("Seu resultado aponta 'ansiedade'");
    p_text = document.createTextNode(
      "Você apresenta sintomas de ansiedade e talvez seja melhor procurar um profissional para ver melhor sua situação."
    );
  } else if (resultado == 1) {
    h4_text = document.createTextNode(
      "Seu resultado aponta 'chance de ansiedade'"
    );
    p_text = document.createTextNode(
      "Você pode ter ansiedade, mas isso não é certo, talvez seja bom ver a opinião de um profissional."
    );
  } else {
    h4_text = document.createTextNode("Seu resultado aponta 'sem ansiedade");
    p_text = document.createTextNode(
      "Você não apresenta sintomas de ansiedade, parece está tudo bem com você, mas não quer dizer que não seja bom passar por um profissional, não é só quando estamos com problemas que precisamos de alguém pra conversar."
    );
  }
  let div1 = document.createElement("div");
  div1.classList.add("button");
  let a = document.createElement("a");
  a.href = "./formulario.html";
  let button1_text = document.createTextNode("Solicitar ajuda psicológica");
  a.appendChild(button1_text);
  div1.appendChild(a);

  let div2 = document.createElement("div");
  div2.classList.add("button");
  let button = document.createElement("button");
  button.href = "./page_teste.html";
  let button2_text = document.createTextNode("Refazer teste");
  button.appendChild(button2_text);
  div2.appendChild(button);

  h4.appendChild(h4_text);
  p.appendChild(p_text);
  div.appendChild(h4);
  div.appendChild(p);
  div.appendChild(div1);
  div.appendChild(div2);
  card.appendChild(div);
  conteudo.appendChild(card);
  button.addEventListener("click", function() {
    deleteresult();
  });
}

function postresult(result) {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/teste";
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      console.log("foi");
    }
  };
  let resultado = {
    resultado: result,
    username: user
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(resultado));
}

function getresult() {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/teste?username=" + user;
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      console.log(parsed);
      if (parsed.length == 0) {
        return;
      } else {
        id = parsed[parsed.length - 1].id;
        if (parsed[parsed.length - 1].resultado <= 7) {
          resultado(0);
        } else if (parsed[parsed.length - 1].resultado <= 11) {
          resultado(1);
        } else {
          resultado(2);
        }
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
if (user != "anonimo") {
  getresult();
}
function deleteresult() {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/teste/" + id;
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      location.reload();
    }
  };
  xhttp.open("DELETE", url, true);
  xhttp.send();
}
