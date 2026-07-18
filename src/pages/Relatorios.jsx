import { buscarProdutos } from "../services/produtoService";

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function buscarVendas() {
  try {
    return JSON.parse(localStorage.getItem("vendas") || "[]");
  } catch {
    return [];
  }
}

function gerarRelatorio() {
  const produtos = buscarProdutos();
  const vendas = buscarVendas();

  const faturamento = vendas.reduce(
    (total, venda) => total + Number(venda.valor || 0),
    0
  );

  const itensVendidos = vendas.reduce(
    (total, venda) => total + Number(venda.quantidade || 0),
    0
  );

  const vendasPorProduto = vendas.reduce((totais, venda) => {
    const nome = venda.produto || "Produto não identificado";
    totais[nome] = (totais[nome] || 0) + Number(venda.quantidade || 0);
    return totais;
  }, {});

  const produtoMaisVendido = Object.entries(vendasPorProduto)
    .sort(([, quantidadeA], [, quantidadeB]) => quantidadeB - quantidadeA)[0];

  return {
    faturamento,
    itensVendidos,
    ticketMedio: vendas.length ? faturamento / vendas.length : 0,
    produtoMaisVendido: produtoMaisVendido
      ? `${produtoMaisVendido[0]} (${produtoMaisVendido[1]} un.)`
      : "Nenhuma venda registrada",
    estoqueBaixo: produtos.filter(
      (produto) => Number(produto.quantidade || 0) <= 5
    )
  };
}

function Relatorios() {
  const relatorio = gerarRelatorio();

  return (
    <div className="relatorios">
      <h1>Relatórios</h1>
      <p>Resumo das vendas e do estoque do Mini ERP.</p>

      <div className="cards">
        <div className="card">
          <h3>Faturamento total</h3>
          <p>{moeda.format(relatorio.faturamento)}</p>
        </div>

        <div className="card">
          <h3>Produtos vendidos</h3>
          <p>{relatorio.itensVendidos} un.</p>
        </div>

        <div className="card">
          <h3>Ticket médio</h3>
          <p>{moeda.format(relatorio.ticketMedio)}</p>
        </div>

        <div className="card">
          <h3>Produto mais vendido</h3>
          <p>{relatorio.produtoMaisVendido}</p>
        </div>
      </div>

      <section className="card relatorio-estoque">
        <h2>Produtos com estoque baixo</h2>

        {relatorio.estoqueBaixo.length === 0 ? (
          <p>Nenhum produto com estoque igual ou inferior a 5 unidades.</p>
        ) : (
          <ul>
            {relatorio.estoqueBaixo.map((produto) => (
              <li key={produto.id}>
                {produto.nome}: {produto.quantidade} un.
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Relatorios;
