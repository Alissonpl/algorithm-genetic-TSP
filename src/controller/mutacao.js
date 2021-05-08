function Mutacao() {
  this.mutar = function (populacao, quantidadeCidades, cidade_inicial) {
    populacao.getIndividuos().forEach((individuo) => {
      //const sorteio = Math.floor(Math.random() * 100);
      // if (sorteio < taxa) {
      const gene1 = Math.floor(Math.random() * quantidadeCidades);
      let gene2;
      do {
        gene2 = Math.floor(Math.random() * quantidadeCidades);
      } while (gene1 === gene2);
      individuo.inverterGene(gene1, gene2, cidade_inicial);
      // }
    });
  };
}

module.exports = Mutacao;
