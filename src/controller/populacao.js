const Individuo = require("./individuo.js");
const Cidade = require("../model/cidade");
function Populacao() {
  let tamanho;
  let individuos = [];
  let geracao = 1;
  cromossMaster = [];
  this.getTamanho = function () {
    return tamanho;
  };

  this.getIndividuos = function () {
    return individuos.slice();
  };

  this.getGeracao = function () {
    return geracao;
  };

  this.setTamanho = function (t) {
    if (t <= 0) {
      console.log("O tamanho da população deve ser maior que 0.");
      process.exit(1);
    }

    tamanho = t % 2 == 0 ? t : ++t;
  };

  this.setGeracao = function () {
    geracao++;
  };

  this.iniciarPopulacao = function (quantidadeCidades, cidade_inicial) {
    for (let j = 0; j < tamanho; j++) {
      const individuo = new Individuo();

      individuo.setCromossomoIncial(quantidadeCidades, cidade_inicial);
      individuos.push(individuo);
    }
  };

  this.calcularFitness = function (distancias, cidade_inicial) {
    let cromossomo1 = [];
    let cromossomo3 = [];
    let ff = 0;

    individuos.forEach((individuo) => {
      let cromossomo2 = [];
      let index;

      for (index = 0; index < individuo.getCromossomo().length - 1; index++) {
        let cidade = individuo.getCromossomo()[index];
        cromossomo2.push(cidade);
        cromossomo1 = cromossomo2;
      }
      cromossomo1.forEach((i, index) => {
        ff = index;
        if (index != 0 && i == cidade_inicial) {
          cromossomo3[0] = cidade_inicial;
          cromossomo3[index] = cromossomo1[0];
        } else {
          cromossomo3[index] = i;
        }
      });
    });

    individuos.forEach((individuo) => {
      let fitness = 0;
      let cidadeA = 0;
      let cidadeB = 0;

      for (let index = 0; cromossomo3.length - 1 >= index; index++) {
        cidadeA = cromossomo3[index];
        cidadeB = cromossomo3[index + 1];
        distancias[cidadeA][cidadeB] !== undefined &&
          (fitness += distancias[cidadeA][cidadeB]);
      }

      //cidade final
      cidadeA = cromossomo3[24];
      // //cidade inicial
      cidadeB = individuo.getCromossomo()[0];
      distancias[cidadeA][cidadeB] !== undefined &&
        (fitness += distancias[cidadeA][cidadeB]);

      individuo.setFitness(fitness);
    });
    cromossMaster.push(cromossomo3);
  };

  this.adicionarFilhos = function (filho1, filho2) {
    //console.log(filho1, filho2);
    let individuo = new Individuo();
    individuo.setCromossomo(filho1);
    individuos.push(individuo);

    individuo = new Individuo();
    individuo.setCromossomo(filho2);
    individuos.push(individuo);
  };

  this.ajustarPopulacao = function () {
    individuos.splice(tamanho);
  };

  this.exibirPopoulacao = function () {
    let cromossomo = [];
    let fitness = [];

    individuos.forEach((individuo, index) => {
      cromossomo[index] = individuo.getCromossomo();
      fitness[index] = individuo.getFitness();
    });

    console.log("População:");
    console.log(cromossomo);
    console.log("Fitness:");
    console.table(fitness);
    console.log("geração: ", geracao);
    console.log("\n****************************\n");
  };

  this.getMenorDistanciaAndRota = function () {
    console.log("Solução encontrada:");
    let cromossomo = [];
    let fitness = [];
    const cidades = new Cidade();
    individuos.forEach((individuo, index) => {
      fitness[index] = individuo.getFitness();
      cromossomo[index] = individuo.getCromossomo();
    });

    let menorDistancia = fitness[0];
    let rota = cromossMaster[0];
    fitness.map((i, index) => {
      menorDistancia <= i
        ? (menorDistancia = menorDistancia)
        : (menorDistancia = i),
        rota[index];
    });
    rota.push(cromossMaster[0][0]);
    rota.forEach((valueRota, index) => {
      cidades.forEach((i, indexCidade) => {
        if (valueRota == indexCidade) {
          rota.push(i);
        }
      });
    });
    rota.forEach((i, index) => {
      if (Number.isInteger(i)) {
        delete rota[index];
      }
    });
    console.table(rota);
    console.log("  Menor distância: ", menorDistancia);
  };
}

module.exports = Populacao;
