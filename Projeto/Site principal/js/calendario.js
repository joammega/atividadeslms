let user = localStorage.getItem("user");
let back = document.querySelector(".back");
let posts = document.querySelector(".posts");
let grafico = document.querySelector(".grafico");
let lista = document.querySelector(".post .lista");

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

  img.scr = "./imgs/humor/" + humor + ".png";
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
function grafico(contador) {}
function getdados(quant) {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/comments?username=" + user;
  let conts = [0, 0, 0, 0, 0];
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      if ((quant = "todos")) {
        for (let i of parsed) {
          postagem(i.data, i.humor, i.comentario);
        }
      } else {
        for (let i = parsed.length - quant; i < parsed.length; i++) {
          if (i >= 0) {
            postagem(parsed[i].data, parsed[i].humor, parsed[i].comentario);
          }
        }
      }
      for (let i of parsed) {
        conts[i.humor] += 1;
      }
      grafico(conts);
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  };
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

humor.children[2].children[1].addEventListener("click", function() {
  let dia = "";
  let mes = calendario.children[0].children[0].innerHTML;
  let humor = "";
  let comentario = humor.children[2].children[0].value;
  for (let i of calendario.children[2].children) {
    if (i.classList.contains("marcado")) {
      dia = i.children[0].innerHTML;
    }
  }
  for (let i of humor.children[1]) {
  }
  let data = dia + " de " + mes;
  postdados(data, humor, comentario);
});
console.log(humor.children[2].children[0].value);
