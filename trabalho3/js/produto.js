function logado() {
  if (
    sessionStorage.getItem("user") == "" ||
    sessionStorage.getItem("user") == undefined
  ) {
    $(".carrinho").hide();
    $(".sair").hide();
    $(".compra").hide();
  } else {
    $(".cadastro").hide();
    $(".login").hide();
  }
}
logado();

$(".logar").click(function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/users",
    success: function(data) {
      for (let i of data) {
        if (data != "" || data != undefined) {
          if (i.name == $(".user").val() && i.senha == $(".senha").val()) {
            sessionStorage.setItem("user", $("user").value);
            location.reload();
            return;
          }
        }
      }
      alert("User não cadastrado");
    }
  });
});
$(".btnsair").click(function() {
  sessionStorage.setItem("user", "");
  location.reload();
});
$(".cadastrar").click(function(event) {
  event.preventDefault();
  if ($(".usercad").val() != "" && $(".senhacad").val() != "") {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/users",
      success: function(data) {
        for (let i of data) {
          if (data != "" || data != undefined) {
            if (i.name == $(".usercad").val()) {
              alert("nome de usuário já cadastrado");
              return;
            }
          }
        }
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/users",
          data: {
            name: $(".usercad").val(),
            senha: $(".senhacad").val()
          },
          success: function() {
            alert("user cadastrado");
          }
        });
      }
    });
  } else {
    alert("informe um user e uma senha.");
  }
});
$(".compra").each(function(index) {
  let quant = $(this)
    .find(".quantidadeform")
    .find(".quantidade");

  $(this)
    .find(".btncompra")
    .click(function() {
      console.log(index);
      let quantidade = "";
      let produto = "";
      if (quant.val() <= 0) {
        alert("quantidade inválida");
        return;
      } else {
        if (
          sessionStorage.getItem("quant") == "" ||
          sessionStorage.getItem("quant") == undefined
        ) {
          quantidade += quant.val();
          produto += index;
          sessionStorage.setItem("quant", quantidade);
          sessionStorage.setItem("prod", produto);
          alert("adicionado");
        } else {
          quantidade = sessionStorage.getItem("quant");
          produto = sessionStorage.getItem("prod");
          quantidade += "-" + quant.val();
          produto += "-" + index;
          sessionStorage.setItem("quant", quantidade);
          sessionStorage.setItem("prod", produto);
          alert("adicionado");
        }
      }
    });
});

function gerarlista(prod, quant) {
  let div = $("<div></div>").addClass("produtocar");
  let img = $("<div></div>").addClass("imgcar");
  div.append(img);
  let texto = $("<div></div>").addClass("textocar");
  let text = "";
  let valor = "";
  $(".texto").each(function(index) {
    if (index == Number(prod)) {
      text = $(this)
        .find(".titulo")
        .html();
      valor = $(this)
        .find(".valor")
        .find(".preco")
        .html();
      total += valor * quant;
    }
  });
  let p1 = $("<p></p>").text(text);
  let p = $("<p></p>").text(quant + "X R$:" + valor);
  texto.append(p1);
  texto.append(p);
  div.append(texto);
  $(".dropcarrinho").append(div);
}
let total = 0;
$(".carrinhobtn").click(function() {
  $(".dropcarrinho").html("");
  if (
    sessionStorage.getItem("quant") != "" &&
    sessionStorage.getItem("quant") != undefined
  ) {
    total = 0;
    let quantidade = sessionStorage.getItem("quant").split("-");
    let produto = sessionStorage.getItem("prod").split("-");
    for (let i = 0; i < quantidade.length; i++) {
      gerarlista(produto[i], quantidade[i]);
    }
    botao();
  } else {
    $(".dropcarrinho").append($("<p></p>").text("carrinho vazio"));
  }
});
function botao() {
  let p = $("<p></p>").text("Total: R$:" + total);
  let button = $("<div></div>")
    .addClass("btn btn-primary")
    .text("Finalizar compra");
  $(".dropcarrinho").append(p);
  $(".dropcarrinho").append(button);
}
