const CHAVE = "movimentacoes";


// Buscar movimentações
export function buscarMovimentacoes() {

  const movimentacoesSalvas =
    localStorage.getItem(CHAVE);


  if (movimentacoesSalvas) {

    return JSON.parse(movimentacoesSalvas);

  }


  return [];

}



// Salvar movimentações
export function salvarMovimentacoes(movimentacoes) {

  localStorage.setItem(
    CHAVE,
    JSON.stringify(movimentacoes)
  );

}



// Adicionar movimentação
export function adicionarMovimentacao(movimentacao) {


  const movimentacoes =
    buscarMovimentacoes();



  const novasMovimentacoes = [

    ...movimentacoes,

    movimentacao

  ];



  salvarMovimentacoes(novasMovimentacoes);



  return novasMovimentacoes;

}