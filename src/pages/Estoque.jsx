import { useEffect, useState } from "react";
import { movimentarEstoque } from "../services/movimentacaoService";
import { buscarProdutos } from "../services/produtoService";

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [mensagem, setMensagem] = useState("");

  async function carregar() { try { setProdutos(await buscarProdutos()); } catch (error) { setMensagem(error.message); } }
  useEffect(() => {
    let ativo = true;
    buscarProdutos().then((dados) => ativo && setProdutos(dados)).catch((error) => ativo && setMensagem(error.message));
    return () => { ativo = false; };
  }, []);
  async function movimentar(produtoId, tipo) {
    try {
      await movimentarEstoque(produtoId, tipo, quantidades[produtoId]);
      setQuantidades((atual) => ({ ...atual, [produtoId]: "" })); setMensagem(""); await carregar();
    } catch (error) { setMensagem(error.message); }
  }

  return <div><h1>Estoque</h1>{mensagem && <p className="mensagem erro">{mensagem}</p>}<div className="tabela"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Estoque atual</th><th>Quantidade</th><th>Ações</th></tr></thead>
    <tbody>{produtos.map((item) => <tr key={item.id}><td>{item.nome}</td><td>{item.categoria || "—"}</td><td>{item.quantidade}</td><td><input aria-label={`Quantidade de ${item.nome}`} type="number" min="1" step="1" value={quantidades[item.id] || ""} onChange={(e) => setQuantidades((atual) => ({ ...atual, [item.id]: e.target.value }))} /></td><td><button onClick={() => void movimentar(item.id, "Entrada")}>Entrada</button><button onClick={() => void movimentar(item.id, "Saída")}>Saída</button></td></tr>)}</tbody>
  </table></div></div>;
}

export default Estoque;
