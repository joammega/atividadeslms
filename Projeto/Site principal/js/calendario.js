let user = localStorage.getItem("user");
let back = document.querySelector(".back");
let posts = document.querySelector(".posts");
let grafico = document.querySelector(".grafico");
let lista = document.querySelector(".posts .lista");

function postagem(data, humor, comentario) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let img = document.createElement("img");
  let divaux = document.createElement("div");

  div.classList.add("card");

  divaux.classList.add("data");

  let p_text = document.createTextNode(data);
  p.appendChild(p_text);
  divaux.appendChild(p);
  div.appendChild(divaux);

  divaux = document.createElement("div");
  divaux.classList.add("humor");

  img.src = "./imgs/humor/" + humor + ".png";
  divaux.appendChild(img);
  div.appendChild(divaux);

  divaux = document.createElement("div");
  divaux.classList.add("comentario");
  p = document.createElement("p");
  p_text = document.createTextNode(comentario);

  p.appendChild(p_text);
  divaux.appendChild(p);
  div.appendChild(divaux);

  lista.appendChild(div);
}
function grafic(contador) {
  let grafico = document.querySelectorAll(".posts .grafico .humor");
  total = contador[0] + contador[1] + contador[2] + contador[3] + contador[4];
  for (let i = 0; i < grafico.length; i++) {
    let percent = (contador[i] / total) * 100;
    grafico[i].children[0].style.width = percent + "%";
  }
}

function getdados(quant) {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/comments?username=" + user;
  let conts = [0, 0, 0, 0, 0];
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      if (parsed.length != 0) {
        if (quant != 5) {
          lista.innerHTML = "";
          for (let i of parsed) {
            postagem(i.data, i.humor, i.comentario);
          }
        } else {
          lista.innerHTML = "";
          console.log("oi");
          for (let i = 0; i < parsed.length; i++) {
            if (i > parsed.length - quant) {
              postagem(parsed[i].data, parsed[i].humor, parsed[i].comentario);
            }
            3;
          }
        }
        for (let i of parsed) {
          conts[i.humor] += 1;
        }
        grafic(conts);
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function postdados(data, humor, comentario) {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/comments";
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      getdados(5);
    }
  };
  let post = {
    username: user,
    data: data,
    humor: humor,
    comentario: comentario
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(post));
}
let humor = document.querySelector(".back .funcao .conteudo .humor");
let calendario = document.querySelector(".back .funcao .conteudo .calendario");
let input = document.querySelector(
  ".back .funcao .conteudo .humor .form input"
);
function qualhumor() {
  for (let i = 0; i < humor.children[1].children.length; i++) {
    if (humor.children[1].children[i].classList.contains("marcado")) {
      return i;
    } else if (i == 4) {
      alert("você esqueceu de marcar o humor");
      return false;
    }
  }
}

humor.children[2].children[1].addEventListener("click", function(event) {
  event.preventDefault();
  let dia = "";
  let mes = calendario.children[0].children[0].innerHTML;
  if (qualhumor() == false && qualhumor() != 0) {
    return;
  }
  let humor = qualhumor();
  let comentario = input.value;

  for (let i of calendario.children[2].children) {
    if (i.classList.contains("marcado")) {
      dia = i.children[0].innerHTML;
    }
  }
  let data = dia + " de " + mes;
  postdados(data, humor, comentario);
});
for (let i of humor.children[1].children) {
  i.addEventListener("click", function() {
    for (let j of humor.children[1].children) {
      j.classList.remove("marcado");
    }
    i.classList.add("marcado");
  });
}
for (let i of calendario.children[2].children) {
  i.addEventListener("click", function() {
    for (let j of calendario.children[2].children) {
      j.classList.remove("marcado");
    }
    i.classList.add("marcado");
  });
}
getdados(5);
