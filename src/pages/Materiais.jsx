import { useEffect, useState } from "react";
import {
  adicionarMaterial,
  atualizarMaterial,
  buscarMateriais,
  removerMaterial,
} from "../services/materialService";

const categorias = [
  "Miçangas",
  "Fios",
  "Cordões",
  "Crucifixos",
  "Medalhas",
  "Contas",
  "Pingentes",
  "Argolas",
  "Fechos",
  "Entremeios",
  "Tasséis",
  "Embalagens",
  "Etiquetas",
  "Ferramentas",
  "Outros",
];

const inicial = {
  nome: "",
  categoria: "",
  unidade: "un",
  precoUnitario: "",
  quantidadeEstoque: "",
};

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function Materiais() {
  const [materiais, setMateriais] = useState([]);
  const [material, setMaterial] = useState(inicial);
  const [editando, setEditando] = useState(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const dados = await buscarMateriais();
      setMateriais(dados);
    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(event) {
    event.preventDefault();

    try {
      if (editando) {
        await atualizarMaterial(editando, material);
      } else {
        await adicionarMaterial(material);
      }

      setMaterial(inicial);
      setEditando(null);
      setErro("");

      await carregar();
    } catch (error) {
      setErro(error.message);
    }
  }

  async function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este material?")) return;

    try {
      await removerMaterial(id);
      await carregar();
    } catch (error) {
      setErro(error.message);
    }
  }

  function editar(item) {
    setEditando(item.id);

    setMaterial({
      nome: item.nome,
      categoria: item.categoria || "",
      unidade: item.unidade,
      precoUnitario: item.preco_unitario,
      quantidadeEstoque: item.quantidade_estoque,
    });
  }

  return (
    <div>
      <h1>Materiais</h1>

      <p>Cadastre toda a matéria-prima utilizada na produção.</p>

      {erro && <p className="mensagem erro">{erro}</p>}

      <form onSubmit={salvar} className="formulario">

        <input
          type="text"
          placeholder="Nome do material"
          value={material.nome}
          onChange={(e) =>
            setMaterial({ ...material, nome: e.target.value })
          }
          required
        />

        <select
          value={material.categoria}
          onChange={(e) =>
            setMaterial({ ...material, categoria: e.target.value })
          }
          required
        >
          <option value="">Selecione a categoria</option>

          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Unidade (un, m, kg...)"
          value={material.unidade}
          onChange={(e) =>
            setMaterial({ ...material, unidade: e.target.value })
          }
          required
        />

        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço unitário"
          value={material.precoUnitario}
          onChange={(e) =>
            setMaterial({
              ...material,
              precoUnitario: e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          min="0"
          step="1"
          placeholder="Quantidade em estoque"
          value={material.quantidadeEstoque}
          onChange={(e) =>
            setMaterial({
              ...material,
              quantidadeEstoque: e.target.value,
            })
          }
          required
        />

        <button type="submit">
          {editando ? "Salvar alteração" : "Cadastrar material"}
        </button>

        {editando && (
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              setMaterial(inicial);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="tabela">
        <table>
          <thead>
            <tr>
              <th>Material</th>
              <th>Categoria</th>
              <th>Unidade</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {materiais.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.categoria}</td>
                <td>{item.unidade}</td>
                <td>{moeda.format(item.preco_unitario)}</td>
                <td>{item.quantidade_estoque}</td>

                <td>
                  <button onClick={() => editar(item)}>
                    Editar
                  </button>

                  <button onClick={() => void excluir(item.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Materiais;