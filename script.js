var listaFilmes = [];

function limparCampo(nomeCampo) {
  document.getElementById(nomeCampo).value = "";
}

function limparVitrine(nomeVitrine) {
  document.getElementById(nomeVitrine).innerHTML = "";
}

function capturaFilmes() {
  var urlFilme = document.getElementById("filme").value;
  var nomeFilme = document.getElementById("nomeFilme").value;
  var trailer = document.getElementById("trailer").value;
  var usuario = document.getElementById("usuario").value;

  var filme = {
    url: urlFilme,
    nomeFilme: nomeFilme,
    trailer: trailer,
    usuario: usuario,
  };

  return filme;
}

function excluirFilme(i) {
  console.log("Removendo filme: ", listaFilmes[i]);
  listaFilmes.splice(i, 1);
  console.log("Lista de filmes após remoção: ", listaFilmes);
  exibirFilmes();
}

function exibirFilmes() {
  limparVitrine("listaFilmes");

  for (var i = 0; i < listaFilmes.length; i++) {
    var filmeURL = document.createElement("img");
    filmeURL.src = listaFilmes[i].url;
    filmeURL.className = "filme-imagem";

    var filmeNome = document.createElement("p");
    filmeNome.className = "page-subtitle";
    filmeNome.textContent = listaFilmes[i].nomeFilme;

    var botaoTrailer = document.createElement("a");
    botaoTrailer.href = listaFilmes[i].trailer;
    botaoTrailer.target = "_blank";
    botaoTrailer.id = "botao-trailer";
    botaoTrailer.style.display = listaFilmes[i].trailer ? "block" : "none";
    botaoTrailer.rel = "noopener noreferrer";

    var imgTrailer = document.createElement("img");
    imgTrailer.src = "https://cdn-icons-png.flaticon.com/512/2468/2468825.png";

    botaoTrailer.appendChild(imgTrailer);

    var filmeURL = document.createElement("img");
    filmeURL.src = listaFilmes[i].url;
    filmeURL.className = "filme-imagem";

    var filmeNome = document.createElement("p");
    filmeNome.className = "page-subtitle";
    filmeNome.textContent = listaFilmes[i].nomeFilme;

    var botaoExcluir = document.createElement("a");
    botaoExcluir.onclick = (function (indice) {
      return function () {
        excluirFilme(indice);
      };
    })(i);
    botaoExcluir.id = "botao-excluir";
    botaoExcluir.rel = "noopener noreferrer";

    var imgBotao = document.createElement("img");
    imgBotao.src = "https://cdn-icons-png.flaticon.com/512/3635/3635122.png";

    botaoExcluir.appendChild(imgBotao);

    var usuario = document.createElement("p");
    usuario.className = "page-subtitle";
    usuario.textContent = "adicionado por " + listaFilmes[i].usuario;

    var filmeContainer = document.createElement("div");
    filmeContainer.className = "filme-container position-relative";

    filmeContainer.appendChild(filmeURL);
    filmeContainer.appendChild(filmeNome);
    filmeContainer.appendChild(usuario);
    filmeContainer.appendChild(botaoTrailer);
    filmeContainer.appendChild(botaoExcluir);

    var vitrineFilmes = document.getElementById("listaFilmes");
    vitrineFilmes.appendChild(filmeContainer);
  }
}

function salvarFilme() {
  listaFilmes.push(capturaFilmes());
}

function atualizaSite() {
  salvarFilme();
  exibirFilmes();
  limparCampo("filme");
  limparCampo("nomeFilme");
  limparCampo("usuario");
  limparCampo("trailer");
}

function verificarRepeticao() {
  var filmeRepetido = false;

  for (var i = 0; i < listaFilmes.length; i++) {
    if (
      capturaFilmes().nomeFilme === listaFilmes[i].nomeFilme ||
      capturaFilmes().url === listaFilmes[i].url
    ) {
      filmeRepetido = true;
    }
  }

  if (!filmeRepetido) {
    atualizaSite();
  } else {
    alert("O filme já foi adicionado, escolha outro por favor!");

    limparCampo("filme");
    limparCampo("nomeFilme");
  }
}

function verificarURL(filme) {
  var imagem = document.createElement("img");

  imagem.src = filme.url;
  imagem.onerror = function () {
    alert("A imagem parece inválida, tente outra por favor!");

    limparCampo("filme");
  };

  imagem.onload = function () {
    verificarRepeticao();
  };
}

function adicionarFilme() {
  verificarURL(capturaFilmes());
}
