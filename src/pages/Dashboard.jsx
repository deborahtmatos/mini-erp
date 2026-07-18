import { useEffect, useState } from "react";
import { buscarProdutos } from "../services/produtoService";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Dashboard() {
  const [dados, setDados] = useState({ totalProdutos: 0, totalEstoque: 0, valorEstoque: 0, estoqueBaixo: 0 });
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    buscarProdutos()
      .then((produtos) => {
        if (!ativo) return;
        const totalEstoque = produtos.reduce((total, produto) => total + produto.quantidade, 0);
        const valorEstoque = produtos.reduce((total, produto) => total + Number(produto.preco) * produto.quantidade, 0);
        setDados({ totalProdutos: produtos.length, totalEstoque, valorEstoque, estoqueBaixo: produtos.filter((produto) => produto.quantidade <= 5).length });
      })
      .catch((error) => ativo && setErro(error.message));
    return () => { ativo = false; };
  }, []);

  if (erro) return <p className="mensagem erro">{erro}</p>;

  return <div className="dashboard"><h1>Dashboard</h1><div className="cards">
    <div className="card"><h3>Produtos cadastrados</h3><p>{dados.totalProdutos}</p></div>
    <div className="card"><h3>Itens em estoque</h3><p>{dados.totalEstoque}</p></div>
    <div className="card"><h3>Valor do estoque</h3><p>{moeda.format(dados.valorEstoque)}</p></div>
    <div className="card"><h3>Estoque baixo</h3><p>{dados.estoqueBaixo}</p></div>
  </div></div>;
}

export default Dashboard;
