import { useEffect, useState } from "react";
import { adicionarMaterial, atualizarMaterial, buscarMateriais, removerMaterial } from "../services/materialService";

const inicial = { nome: "", unidade: "un", precoUnitario: "", quantidadeEstoque: "" };
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Materiais() {
  const [materiais, setMateriais] = useState([]);
  const [material, setMaterial] = useState(inicial);
  const [editando, setEditando] = useState(null);
  const [erro, setErro] = useState("");

  async function carregar() { try { setMateriais(await buscarMateriais()); } catch (error) { setErro(error.message); } }
  useEffect(() => {
    let ativo = true;
    buscarMateriais().then((dados) => ativo && setMateriais(dados)).catch((error) => ativo && setErro(error.message));
    return () => { ativo = false; };
  }, []);
  async function salvar(event) {
    event.preventDefault();
    try { if (editando) await atualizarMaterial(editando, material); else await adicionarMaterial(material); setMaterial(inicial); setEditando(null); setErro(""); await carregar(); } catch (error) { setErro(error.message); }
  }
  async function excluir(id) {
    if (!window.confirm("Excluir este material?")) return;
    try { await removerMaterial(id); await carregar(); } catch (error) { setErro(error.message); }
  }
  function editar(item) { setEditando(item.id); setMaterial({ nome: item.nome, unidade: item.unidade, precoUnitario: item.preco_unitario, quantidadeEstoque: item.quantidade_estoque }); }

  return <div><h1>Materiais</h1><p>Cadastre os materiais usados na formação dos preços.</p>{erro && <p className="mensagem erro">{erro}</p>}<form onSubmit={salvar} className="formulario"><input placeholder="Nome do material" value={material.nome} onChange={(event) => setMaterial({ ...material, nome: event.target.value })} required /><input placeholder="Unidade (ex.: kg, m, un)" value={material.unidade} onChange={(event) => setMaterial({ ...material, unidade: event.target.value })} required /><input type="number" min="0" step="0.01" placeholder="Preço unitário" value={material.precoUnitario} onChange={(event) => setMaterial({ ...material, precoUnitario: event.target.value })} required /><input type="number" min="0" step="0.001" placeholder="Quantidade em estoque" value={material.quantidadeEstoque} onChange={(event) => setMaterial({ ...material, quantidadeEstoque: event.target.value })} required /><button type="submit">{editando ? "Salvar alteração" : "Cadastrar material"}</button>{editando && <button type="button" onClick={() => { setEditando(null); setMaterial(inicial); }}>Cancelar</button>}</form><div className="tabela"><table><thead><tr><th>Material</th><th>Unidade</th><th>Preço unitário</th><th>Estoque</th><th>Ações</th></tr></thead><tbody>{materiais.map((item) => <tr key={item.id}><td>{item.nome}</td><td>{item.unidade}</td><td>{moeda.format(item.preco_unitario)}</td><td>{item.quantidade_estoque}</td><td><button onClick={() => editar(item)}>Editar</button><button onClick={() => void excluir(item.id)}>Excluir</button></td></tr>)}</tbody></table></div></div>;
}

export default Materiais;
