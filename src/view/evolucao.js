const Rotas = require("../controller/rotas");
const Populacao = require("../controller/populacao");
const Reproducao = require("../controller/reproducao");
const Mutacao = require("../controller/mutacao");
const Objetivo = require("../controller/objetivo");
function Evolucao(
  quantidadeCidades,
  tamanhoPopulacao,
  limiteGeracoes = "infinata",
  cidade_inicial
) {
  const objetivo = new Objetivo();
  const rotas = new Rotas(quantidadeCidades);

  const populacao = new Populacao();

  populacao.setTamanho(tamanhoPopulacao);

  this.evoluir = function () {
    console.time("Tempo de execução");

    populacao.iniciarPopulacao(rotas.getQuantidadeCidades(), cidade_inicial);
    populacao.calcularFitness(rotas.getDistancias(), cidade_inicial);

    do {
      populacao.exibirPopoulacao();

      if (objetivo.definirParada(populacao.getGeracao(), limiteGeracoes)) break;

      reproducao = new Reproducao();
      reproducao.reproduzir(
        populacao,
        rotas.getQuantidadeCidades(),
        cidade_inicial
      );

      mutacao = new Mutacao();
      mutacao.mutar(populacao, rotas.getQuantidadeCidades(), cidade_inicial);

      populacao.calcularFitness(rotas.getDistancias(), cidade_inicial);
      populacao.ajustarPopulacao();
      populacao.setGeracao();
    } while (true);

    populacao.getMenorDistanciaAndRota();

    console.timeEnd("Tempo de execução");
  };
}

module.exports = Evolucao;
