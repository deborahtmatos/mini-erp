import { useEffect, useState } from "react";
import { buscarMovimentacoes } from "../services/movimentacaoService";

function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [erro, setErro] = useState("");
  useEffect(() => {
    let ativo = true;
    buscarMovimentacoes().then((dados) => ativo && setMovimentacoes(dados)).catch((error) => ativo && setErro(error.message));
    return () => { ativo = false; };
  }, []);
  if (erro) return <p className="mensagem erro">{erro}</p>;
  return <div><h1>Histórico de movimentações</h1>{movimentacoes.length === 0 ? <p>Nenhuma movimentação registrada.</p> : <div className="tabela"><table><thead><tr><th>Data</th><th>Produto</th><th>Tipo</th><th>Quantidade</th></tr></thead><tbody>{movimentacoes.map((item) => <tr key={item.id}><td>{new Date(item.created_at).toLocaleString("pt-BR")}</td><td>{item.produto}</td><td>{item.tipo}</td><td>{item.quantidade}</td></tr>)}</tbody></table></div>}</div>;
}

export default Movimentacoes;
