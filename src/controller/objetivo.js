function Objetivo() {
  this.definirParada = function (geracaoAtual, maximoGeracoes) {
    return geracaoAtual >= maximoGeracoes;
  };
}

module.exports = Objetivo;
