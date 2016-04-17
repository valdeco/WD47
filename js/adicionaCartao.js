var adicionaCartao = (function(){

  var contador = 0;

  return function(conteudo, cor){

    function removeCartao(conteudo){

      var $cartao = document.querySelector("#cartao_" + this.dataset.ref);

      //dá ua classe que faz ele sumir devagar
      $cartao.classList.add("cartao--some");

      //tira da página depois da animação
      setTimeout(function(){
          $cartao.remove();
      }, 400);          

    }

    //Decide o tipo do cartao
    function decideTipoCartao(conteudo){

      var quebras = conteudo.split("<br>").length;
      var totalDeLetras = conteudo.replace(/<br>/g," ").length;

      var ultimoMaior = "";
      conteudo.replace(/<br>/g, " ")
              .split(" ")
              .forEach(function(palavra){
                  if (palavra.length > ultimoMaior.length){
                      ultimoMaior = palavra;
                  }
              });
      var tamMaior = ultimoMaior.length;

      //no mínimo, todo cartão tem o texto pequeno
      var tipoCartao = "cartao--textoPequeno";

      if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
          tipoCartao = "cartao--textoGrande";
      }
      else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
          tipoCartao = "cartao--textoMedio"
      }
      return tipoCartao;
    }
    
    //soma um no contador
    contador++;

    // cria atributo data-ref
    var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                   .attr("data-ref", contador)
                                   .text("Remover")
                                   .click(removeCartao);

    // cria a div de opções
    var opcoes = $("<div>").addClass("opcoesDoCartao")
                           .append(botaoRemove);

    // chamada para nova função
    var tipoCartao = decideTipoCartao(conteudo);

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .append(conteudo);

    //cria o atributo id
    $("<div>").attr("id","cartao_" + contador)
              .addClass("cartao")
              .addClass(tipoCartao)
              .append(opcoes)
              .append(conteudoTag)
              .css("background-color", "#F00")
              .prependTo(".mural");
}

})();