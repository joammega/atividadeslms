function getUser() {
  let url = "http://localhost:3000/users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      for (let i of parsed) {
        if (login[0].value == i.email && login[1].value == i.password) {
          localStorage.setItem("user", i.username);
          window.location.href = "./index.html";
          return;
        }
      }
      alert("user nao cadastrado");
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
let login = document.querySelectorAll(".back .window .form form input");
let entrar = document.querySelector(".back .window .form form .entrar");
entrar.addEventListener("click", function(event) {
  event.preventDefault();
  getUser();
});
localStorage.setItem("user", "");
let cadastrar = document.querySelector(
  ".back .window .cadastro .elementos button"
);
let texto = document.querySelector(".back .window .cadastro .elementos b");
let status = "cadastrar";
cadastrar.addEventListener("click", function() {
  if (status == "cadastrar") {
    mudar();
    status = "logar";
    cadastrar.innerHTML = "Logar";
    texto.innerHTML = "Já tem conta?";
  } else {
    location.reload();
  }
});

function mudar() {
  let form = document.querySelector(".back .window .form form");
  form.innerHTML = "";
  let br = document.createElement("br");
  let b = document.createElement("b");
  let b_text = document.createTextNode("Cadastre-se");

  let input = document.createElement("input");
  let button = document.createElement("div");
  button.classList.add("button");
  let button_text = document.createTextNode("Cadastrar");
  button.appendChild(button_text);
  button.addEventListener("click", function() {
    conferir();
  });
  b.appendChild(b_text);
  form.appendChild(b);
  form.appendChild(br);
  form.innerHTML += "E-mail";
  form.appendChild(br);
  form.appendChild(input);
  form.appendChild(br);
  form.innerHTML += "Username";
  form.appendChild(br);
  form.appendChild(input);
  form.appendChild(br);
  form.innerHTML += "senha";
  form.appendChild(br);
  form.appendChild(input);
  form.appendChild(br);
  form.appendChild(button);
}
function postcadastro(email, user, senha) {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/users";
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      alert("parabens você foi cadastrado");
      location.reload();
    }
  };
  let item = {
    email: email,
    username: user,
    password: senha
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(item));
}
function conferir() {
  let cadastro = document.querySelectorAll(".back .window .form form input");
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:3000/users";
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      for (let i of parsed) {
        if (
          i.username == cadastro[1].value ||
          i.email == cadastro[0].value ||
          cadastro[0].value == "" ||
          cadastro[1].value == "" ||
          cadastro[2].value == ""
        ) {
          alert("cadastro inválido");
          return;
        }
      }
      postcadastro(cadastro[0].value, cadastro[1].value, cadastro[2].value);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
