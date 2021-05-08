function Reproducao() {
  let selecionados = [];

  function sortearIndividuos(populacao) {
    /*sortear individuos pela proporção do fitness*/
    let individuos = populacao.getIndividuos();

    populacao.getIndividuos().forEach(() => {
      let somatorioFitness = 0;

      individuos.forEach((element) => {
        somatorioFitness += element.getFitness();
      });

      let sorteio = Math.floor(Math.random() * somatorioFitness);
      let posicaoSorteada = -1;

      do {
        posicaoSorteada++;
        sorteio -= individuos[posicaoSorteada].getFitness();
      } while (sorteio > 0);

      selecionados.push(individuos[posicaoSorteada]);
      individuos.splice(posicaoSorteada, 1);
    });
  }

  this.reproduzir = function (populacao, quantidadeCidades, cidade_inicial) {
    sortearIndividuos(populacao);
    let partida_cidade_inicial = 0;
    /*cruzamento Order Crossover (OX)*/
    for (i = 0; i < populacao.getTamanho(); i = i + 2) {
      partida_cidade_inicial = i;
      let ponto1 = Math.floor(Math.random() * (quantidadeCidades - 1));
      let ponto2;

      if (ponto1 == 0)
        ponto2 =
          Math.floor(Math.random() * (quantidadeCidades - 2 - (ponto1 + 1))) +
          (ponto1 + 1);
      else
        ponto2 =
          Math.floor(Math.random() * (quantidadeCidades - 1 - (ponto1 + 1))) +
          (ponto1 + 1);
      //console.log(ponto1, ponto2);
      let filho1 = [];
      let filho2 = [];

      for (let j = ponto1; j <= ponto2; j++) {
        if (j === 0) {
          filho1[0] = cidade_inicial;
          filho2[0] = cidade_inicial;
          console.log("aaa");
        } else {
          filho1[j] = selecionados[i].getCromossomo()[j];
          filho2[j] = selecionados[i + 1].getCromossomo()[j];
        }
      }
      //console.log(filho1, filho2);
      let j = ponto2;
      let k = ponto2;

      while (true) {
        j++;

        if (j == quantidadeCidades) j = 0;

        if (j == ponto1) break;

        let cidadeExiste;

        do {
          k++;

          if (k == quantidadeCidades) k = 0;

          cidadeExiste = filho1.includes(
            selecionados[i + 1].getCromossomo()[k]
          );
        } while (cidadeExiste);
        if (j === 0) {
          filho1[0] = cidade_inicial;
        } else {
          filho1[j] = selecionados[i + 1].getCromossomo()[k];
        }
      }

      j = ponto2;
      k = ponto2;

      while (true) {
        j++;

        if (j == quantidadeCidades) j = 0;

        if (j == ponto1) break;

        let cidadeExiste;

        do {
          k++;

          if (k == quantidadeCidades) k = 0;

          cidadeExiste = filho2.includes(selecionados[i].getCromossomo()[k]);
        } while (cidadeExiste);
        if (j === 0) {
          filho2[0] = cidade_inicial;
        } else {
          filho2[j] = selecionados[i].getCromossomo()[k];
        }
      }
      //console.log(filho1, filho2);
      //if (partida_cidade_inicial > 0) {
      populacao.adicionarFilhos(filho1, filho2);
      // } else {
      //populacao.adicionarFilhos(filho1, filho2);
      //}
    }
  };
}

module.exports = Reproducao;
