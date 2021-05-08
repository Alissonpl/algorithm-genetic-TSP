const Evolucao = require("./view/evolucao.js");

const QUANTIDADE_CIDADES = 26;
const TAMANHO_POPULACAO = 50;
const LIMITE_GERACOES = 4;
const CIDADE_INICIAL = 0;
new Evolucao(
  QUANTIDADE_CIDADES,
  TAMANHO_POPULACAO,
  LIMITE_GERACOES,
  CIDADE_INICIAL
).evoluir();
