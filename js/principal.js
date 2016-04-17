document.querySelector("#mudaLayout").addEventListener("click", function(){

    //Pega o elemento com a class = "mural"
    var $mural = document.querySelector(".mural");

    //Tira ou coloca a classe
    $mural.classList.toggle("mural--linhas");

    if ($mural.classList.contains("mural--linhas")){
        this.textContent = "Blocos";
    }
    else {
        this.textContent = "Linhas";
    }

});

    //pega os botões
    var $botoes = document.querySelectorAll(".opcoesDoCartao-remove");

    for (var index=0; index < $botoes.length; index++) {
        $botoes[index].addEventListener("click", removeCartao);
    }

var $novoCartaoSalvar = document.querySelector(".novoCartao-salvar");
    $novoCartaoSalvar.addEventListener("click", validaCartao);

    var $error = document.createElement("span");

    function validaCartao (event){

        if(!document.querySelector(".novoCartao-conteudo").value){
            event.preventDefault();
            $error.textContent = "Digite o valor no campo acima";
            $error.classList.add("error");
            
        this.parentNode.insertBefore($error, this);

        }
    }

//criando o contador
var contador = $(".cartao").length;

$(".novoCartao").submit(function(event){
    
    var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val()
                        .trim()
                        .replace(/\n/g,"<br>");

        if(conteudo){
            adicionaCartao(conteudo, "yellow")
           
        }
        campoConteudo.val('');
        event.preventDefault();
    });

    // Buscando conteúdo de um cartão
    var conteudo = "Conteudo do meu cartão"

    //termo que o usuário digitou
    var termoBuscado = "conteudo"
    var regex = new RegExp(termoBuscado,"i");
    var temPalavraConteudo = conteudo.match(regex);


// evento de busca
$("#busca").on("input", function(){

//guarda o valor digitado, removendo espaços extras.
    var busca = $(this).val().trim();

    if (busca.length){
        $(".cartao").hide().filter(function(){
            return $(this).find(".cartao-text")
                          .text()
                          .match(new RegExp(busca,"i"));
        }).show();
    }else{
        $(".cartao").show();
    }

});






$("#ajuda").click(function(){
    $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", 
        function(res){
            console.log(res);

            res.instrucoes.forEach(function(instrucao){
                adicionaCartao(instrucao.conteudo, instrucao.cor);


            });
        }
    );
});


(function() {
var usuario = "valdeco@gmail.com";

$("#sync").click( function (){
    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");

    var cartoes = [];

    $(".cartao").each( function (){
        var cartao = {};
        cartao.conteudo = $(this).find(".cartao-conteudo").html();
        cartoes.push(cartao);
});

// escolha seu nome de usuário aqui
var mural = {
    usuario : "valdeco@gmail.com"
    ,cartoes : cartoes
}

    $.ajax({
        url : "https://ceep.herokuapp.com/cartoes/salvar"
        ,method: "POST"
        ,data: mural
        ,success: function (res){
            $("#sync").addClass("botaoSync--sincronizado");
            console.log(res.quantidade + " cartões salvos em "
               + res.usuario );
        }
        ,error: function(){
            $("#sync").addClass("botaoSync--deuRuim");
            console.log("Não foi possível salvar o mural");
        }
        ,complete : function(){
            $("#sync").removeClass("botaoSync--esperando");
        }
    });
});



$.getJSON(
    "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
    {usuario: usuario},

    function(res){
        var cartoes = res.cartoes;
        console.log (cartoes.length + " carregados em " + res.usuario);
        cartoes.forEach (function (cartao){
            adicionaCartao(cartao.conteudo);
        });
    } 
);
})();
