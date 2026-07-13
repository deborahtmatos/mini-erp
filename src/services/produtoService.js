const CHAVE = "produtos";


// Buscar produtos salvos
export function buscarProdutos() {

  const produtosSalvos = localStorage.getItem(CHAVE);

  if (produtosSalvos) {
    return JSON.parse(produtosSalvos);
  }

  return [];

}



// Salvar produtos
export function salvarProdutos(produtos) {

  localStorage.setItem(
    CHAVE,
    JSON.stringify(produtos)
  );

}



// Adicionar produto
export function adicionarProduto(produto) {

  const produtos = buscarProdutos();

  const novosProdutos = [
    ...produtos,
    produto
  ];

  salvarProdutos(novosProdutos);

  return novosProdutos;

}



// Atualizar produto
export function atualizarProduto(produtoAtualizado) {

  const produtos = buscarProdutos();


  const novosProdutos = produtos.map((produto) =>

    produto.id === produtoAtualizado.id
      ? produtoAtualizado
      : produto

  );


  salvarProdutos(novosProdutos);

  return novosProdutos;

}



// Excluir produto
export function removerProduto(id) {

  const produtos = buscarProdutos();


  const novosProdutos = produtos.filter(

    (produto) => produto.id !== id

  );


  salvarProdutos(novosProdutos);

  return novosProdutos;

}