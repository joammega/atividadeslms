let enviar = document.querySelector(".conteiner .mensagens .caixa form button")
let input = document.querySelector(".conteiner .mensagens .caixa form input")
let atual = "";

enviar.addEventListener("click", function(event){
    event.preventDefault();
    enviarmsg(input.value, atual)
    input.value = "";
    
})
function enviarmsg(value, idgrupo){  
    let xhttp = new XMLHttpRequest();
    let url = "http://localhost:3000/conversas"
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            carregarmsgs(atual);
            criarlista();
        }
    }

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type","application/json");
    let item = {
        idgrupo : atual,
        nome : "joao",
        celular : 1,
        mensagem : value
    }
    contador+=1;
    item = JSON.stringify(item);
    xhttp.send(item);

}

function addamigo(text1, text2, id){
    let amigos = document.querySelector(".conteiner .amigos .lista");

    let img = document.createElement("div");
    img.classList.add("img");

    let nome = document.createElement("div");
    nome.classList.add("nome");
    let nome_text = document.createTextNode(text1);

    nome.appendChild(nome_text);

    let msg = document.createElement("div");
    msg.classList.add("msg");
    let msg_text = document.createTextNode(text2);

    msg.appendChild(msg_text);

    let amigo = document.createElement("div");
    amigo.classList.add("amigo");

    amigo.appendChild(img);
    amigo.appendChild(nome);
    amigo.appendChild(msg);

    amigos.appendChild(amigo);

    amigos.addEventListener("click",function(){
        let caixa = document.querySelector(".conteiner .mensagens .caixa");
        carregarmsgs(id);
        caixa.style.display = "block";
        atual = id;
    })
}

function ultimamsg(user, id){
    let url = "http://localhost:3000/conversas"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            let parsed = JSON.parse(xhttp.responseText);
            let mensagem = ""
            for(let i of parsed){
                if(i.idgrupo == id){
                    mensagem = i.mensagem;
                }
            }
            addamigo(user, mensagem, id);
        }
           
      
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}
function criarlista(){
    let url = "http://localhost:3000/grupos"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            let parsed = JSON.parse(xhttp.responseText);
            let nome = "";
            let id = ""
            let lista = document.querySelector(".conteiner .amigos .lista")
            for(let i of parsed){
                console.log(i);
                lista.innerHTML = "";
                if(i.membros.length == 2){
                    for(let j=0; j<i.membros.length;j++){
                        if(i.membros[j].celular == localStorage.getItem("celular")){
                            if(j==1){
                                nome = i.membros[0].nome;
                            }
                            else{
                                nome = i.membros[1].nome;
                            }
                            id = i.idgrupo;
                            ultimamsg(nome, id);
                        }
                    }
                }
                else{
                    nome = i.grupo;
                    id = i.idgrupo;
                    ultimamsg(nome, id);
                }
                
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function addmsg(id, mensagem){
    let conteudo = document.querySelector(".conteiner .mensagens .conteudo");

    let p = document.createElement("p");
    let p_text = document.createTextNode(mensagem);

    p.appendChild(p_text);

    let msg = document.createElement("div")

    if(localStorage.getItem("celular") == id){
        msg.classList.add("msg2");
    }
    else{
        msg.classList.add("msg1");
    }

    msg.appendChild(p);
    conteudo.appendChild(msg);

}
function carregarmsgs(id){
    let url = "http://localhost:3000/conversas?idgrupo="+id
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            let parsed = JSON.parse(xhttp.responseText);
            let conteudo = document.querySelector(".conteiner .mensagens .conteudo");
            conteudo.innerHTML = "";
            for(let i of parsed){
                addmsg(i.celular, i.mensagem);
                conteudo.scrollTop = conteudo.scrollHeight;
            }
        }
    }
    xhttp.open("GET",url, true);
    xhttp.send();

}


criarlista()