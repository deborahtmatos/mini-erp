import { useEffect, useState } from "react";
import { buscarProdutos } from "../services/produtoService";
import { buscarVendas } from "../services/vendaService";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const inicial = { faturamento: 0, itensVendidos: 0, ticketMedio: 0, produtoMaisVendido: "Nenhuma venda registrada", estoqueBaixo: [] };

function Relatorios() {
  const [relatorio, setRelatorio] = useState(inicial);
  const [erro, setErro] = useState("");
  useEffect(() => {
    let ativo = true;
    Promise.all([buscarProdutos(), buscarVendas()]).then(([produtos, vendas]) => {
      if (!ativo) return;
      const faturamento = vendas.reduce((total, venda) => total + Number(venda.valor), 0);
      const itensVendidos = vendas.reduce((total, venda) => total + venda.quantidade, 0);
      const totais = vendas.reduce((acumulado, venda) => ({ ...acumulado, [venda.produto]: (acumulado[venda.produto] || 0) + venda.quantidade }), {});
      const maisVendido = Object.entries(totais).sort(([, a], [, b]) => b - a)[0];
      setRelatorio({ faturamento, itensVendidos, ticketMedio: vendas.length ? faturamento / vendas.length : 0, produtoMaisVendido: maisVendido ? `${maisVendido[0]} (${maisVendido[1]} un.)` : inicial.produtoMaisVendido, estoqueBaixo: produtos.filter((produto) => produto.quantidade <= 5) });
    }).catch((error) => ativo && setErro(error.message));
    return () => { ativo = false; };
  }, []);
  if (erro) return <p className="mensagem erro">{erro}</p>;
  return <div className="relatorios"><h1>Relatórios</h1><p>Resumo das vendas e do estoque do Mini ERP.</p><div className="cards"><div className="card"><h3>Faturamento total</h3><p>{moeda.format(relatorio.faturamento)}</p></div><div className="card"><h3>Produtos vendidos</h3><p>{relatorio.itensVendidos} un.</p></div><div className="card"><h3>Ticket médio</h3><p>{moeda.format(relatorio.ticketMedio)}</p></div><div className="card"><h3>Produto mais vendido</h3><p>{relatorio.produtoMaisVendido}</p></div></div><section className="card relatorio-estoque"><h2>Produtos com estoque baixo</h2>{relatorio.estoqueBaixo.length ? <ul>{relatorio.estoqueBaixo.map((produto) => <li key={produto.id}>{produto.nome}: {produto.quantidade} un.</li>)}</ul> : <p>Nenhum produto com estoque igual ou inferior a 5 unidades.</p>}</section></div>;
}

export default Relatorios;
