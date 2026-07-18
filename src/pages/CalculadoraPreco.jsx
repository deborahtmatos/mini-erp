import { useEffect, useMemo, useState } from "react";
import { buscarMateriais } from "../services/materialService";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const linhaInicial = { materialId: "", quantidade: "" };

function CalculadoraPreco() {
  const [materiais, setMateriais] = useState([]);
  const [itens, setItens] = useState([linhaInicial]);
  const [custosExtras, setCustosExtras] = useState("");
  const [margem, setMargem] = useState("30");
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    buscarMateriais().then((dados) => ativo && setMateriais(dados)).catch((error) => ativo && setErro(error.message));
    return () => { ativo = false; };
  }, []);

  const calculo = useMemo(() => {
    const custoMateriais = itens.reduce((total, item) => {
      const material = materiais.find((atual) => atual.id === Number(item.materialId));
      return total + (material ? Number(material.preco_unitario) * Number(item.quantidade || 0) : 0);
    }, 0);
    const extras = Number(custosExtras || 0);
    const percentual = Number(margem || 0);
    const custoTotal = custoMateriais + extras;
    return { custoMateriais, extras, percentual, custoTotal, precoFinal: custoTotal * (1 + percentual / 100) };
  }, [custosExtras, itens, margem, materiais]);

  function alterarItem(indice, campo, valor) { setItens((atual) => atual.map((item, posicao) => posicao === indice ? { ...item, [campo]: valor } : item)); }
  function removerItem(indice) { setItens((atual) => atual.length === 1 ? atual : atual.filter((_, posicao) => posicao !== indice)); }

  return <div><h1>Calculadora de preço</h1><p>Some os materiais, custos extras e a margem de lucro para obter o preço final.</p>{erro && <p className="mensagem erro">{erro}</p>}<section className="calculadora"><h2>Materiais utilizados</h2>{itens.map((item, indice) => <div className="linha-calculo" key={indice}><select value={item.materialId} onChange={(event) => alterarItem(indice, "materialId", event.target.value)}><option value="">Selecione um material</option>{materiais.map((material) => <option key={material.id} value={material.id}>{material.nome} — {moeda.format(material.preco_unitario)}/{material.unidade}</option>)}</select><input type="number" min="0" step="0.001" placeholder="Quantidade usada" value={item.quantidade} onChange={(event) => alterarItem(indice, "quantidade", event.target.value)} /><button type="button" onClick={() => removerItem(indice)}>Remover</button></div>)}<button type="button" onClick={() => setItens((atual) => [...atual, linhaInicial])}>Adicionar material</button><div className="custos-calculo"><label>Custos extras<input type="number" min="0" step="0.01" value={custosExtras} onChange={(event) => setCustosExtras(event.target.value)} placeholder="Ex.: mão de obra, embalagem" /></label><label>Margem de lucro (%)<input type="number" min="0" step="0.01" value={margem} onChange={(event) => setMargem(event.target.value)} /></label></div></section><section className="resultado-calculo"><h2>Preço final sugerido</h2><dl><div><dt>Custo dos materiais</dt><dd>{moeda.format(calculo.custoMateriais)}</dd></div><div><dt>Custos extras</dt><dd>{moeda.format(calculo.extras)}</dd></div><div><dt>Custo total</dt><dd>{moeda.format(calculo.custoTotal)}</dd></div><div><dt>Margem de lucro</dt><dd>{calculo.percentual}%</dd></div><div className="preco-final"><dt>Preço final</dt><dd>{moeda.format(calculo.precoFinal)}</dd></div></dl></section></div>;
}

export default CalculadoraPreco;
