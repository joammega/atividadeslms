function getUser() {
  let url = "http://localhost:3000/users";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      let parsed = JSON.parse(xhttp.responseText);
      for (let i of parsed) {
        if (login[0].value == i.username && login[1].value == i.password) {
          localStorage.setItem("user", i.username);
        } else {
          alert("user nao cadastrado");
        }
      }
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
function logou() {}
