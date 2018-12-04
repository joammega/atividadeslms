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
