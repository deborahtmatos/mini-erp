import { useEffect, useState } from "react";
import { adicionarProduto, atualizarProduto, buscarProdutos, removerProduto } from "../services/produtoService";

const inicial = { nome: "", categoria: "", preco: "", quantidade: "" };
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState(inicial);
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");

  async function carregarProdutos() {
    try { setProdutos(await buscarProdutos()); } catch (error) { setMensagem(error.message); }
  }
  useEffect(() => {
    let ativo = true;
    buscarProdutos().then((dados) => ativo && setProdutos(dados)).catch((error) => ativo && setMensagem(error.message));
    return () => { ativo = false; };
  }, []);

  async function salvar(event) {
    event.preventDefault();
    try {
      if (editando) await atualizarProduto(editando, produto); else await adicionarProduto(produto);
      setProduto(inicial); setEditando(null); setMensagem(""); await carregarProdutos();
    } catch (error) { setMensagem(error.message); }
  }
  async function excluir(id) {
    if (!window.confirm("Excluir este produto?")) return;
    try { await removerProduto(id); await carregarProdutos(); } catch (error) { setMensagem(error.message); }
  }
  function editar(item) { setEditando(item.id); setProduto({ nome: item.nome, categoria: item.categoria, preco: item.preco, quantidade: item.quantidade }); setMensagem(""); }

  return <div><h1>Produtos</h1><p>Total de produtos: {produtos.length}</p>{mensagem && <p className="mensagem erro">{mensagem}</p>}
    <form onSubmit={salvar} className="formulario">
      <input name="nome" placeholder="Nome do produto" value={produto.nome} onChange={(e) => setProduto({ ...produto, nome: e.target.value })} required />
      <input name="categoria" placeholder="Categoria" value={produto.categoria} onChange={(e) => setProduto({ ...produto, categoria: e.target.value })} />
      <input type="number" name="preco" placeholder="Preço" min="0" step="0.01" value={produto.preco} onChange={(e) => setProduto({ ...produto, preco: e.target.value })} required />
      <input type="number" name="quantidade" placeholder="Quantidade" min="0" step="1" value={produto.quantidade} onChange={(e) => setProduto({ ...produto, quantidade: e.target.value })} required />
      <button type="submit">{editando ? "Salvar alteração" : "Cadastrar produto"}</button>
      {editando && <button type="button" onClick={() => { setEditando(null); setProduto(inicial); }}>Cancelar</button>}
    </form>
    <h2>Produtos cadastrados</h2><div className="tabela"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Quantidade</th><th>Ações</th></tr></thead>
      <tbody>{produtos.map((item) => <tr key={item.id}><td>{item.nome}</td><td>{item.categoria || "—"}</td><td>{moeda.format(item.preco)}</td><td>{item.quantidade}</td><td><button onClick={() => editar(item)}>Editar</button><button onClick={() => void excluir(item.id)}>Excluir</button></td></tr>)}</tbody>
    </table></div>
  </div>;
}

export default Produtos;
