import { useEffect, useState } from "react";
import { buscarProdutos } from "../services/produtoService";
import { buscarVendas, registrarVenda } from "../services/vendaService";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [venda, setVenda] = useState({ produtoId: "", quantidade: "" });
  const [mensagem, setMensagem] = useState("");

  async function carregar() {
    try { const [produtosSalvos, vendasSalvas] = await Promise.all([buscarProdutos(), buscarVendas()]); setProdutos(produtosSalvos); setVendas(vendasSalvas); } catch (error) { setMensagem(error.message); }
  }
  useEffect(() => {
    let ativo = true;
    Promise.all([buscarProdutos(), buscarVendas()]).then(([produtosSalvos, vendasSalvas]) => {
      if (!ativo) return;
      setProdutos(produtosSalvos);
      setVendas(vendasSalvas);
    }).catch((error) => ativo && setMensagem(error.message));
    return () => { ativo = false; };
  }, []);
  async function finalizar(event) {
    event.preventDefault();
    try { await registrarVenda(Number(venda.produtoId), venda.quantidade); setVenda({ produtoId: "", quantidade: "" }); setMensagem(""); await carregar(); } catch (error) { setMensagem(error.message); }
  }

  return <div><h1>Vendas</h1>{mensagem && <p className="mensagem erro">{mensagem}</p>}<form onSubmit={finalizar} className="formulario"><select value={venda.produtoId} onChange={(e) => setVenda({ ...venda, produtoId: e.target.value })} required><option value="">Selecione o produto</option>{produtos.map((produto) => <option key={produto.id} value={produto.id}>{produto.nome} — Estoque: {produto.quantidade}</option>)}</select><input type="number" min="1" step="1" placeholder="Quantidade" value={venda.quantidade} onChange={(e) => setVenda({ ...venda, quantidade: e.target.value })} required /><button type="submit">Finalizar venda</button></form>
    <h2>Vendas realizadas</h2><div className="tabela"><table><thead><tr><th>Data</th><th>Produto</th><th>Quantidade</th><th>Valor</th></tr></thead><tbody>{vendas.map((item) => <tr key={item.id}><td>{new Date(item.created_at).toLocaleString("pt-BR")}</td><td>{item.produto}</td><td>{item.quantidade}</td><td>{moeda.format(item.valor)}</td></tr>)}</tbody></table></div>
  </div>;
}

export default Vendas;
