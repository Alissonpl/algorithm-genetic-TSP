const Distancia = require('../model/distancia');
function Rotas(qc) {
  const quantidadeCidades = qc;
  let setDistancias = null;
  definirDistancias();

  this.getQuantidadeCidades = function () {
    return quantidadeCidades;
  };

  this.getDistancias = function () {
    return setDistancias;
  };

  function definirDistancias() {
    setDistancias = new Distancia();
  }
}

module.exports = Rotas;
