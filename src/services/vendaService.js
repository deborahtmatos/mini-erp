import { supabase } from "../lib/supabase";

function tratarErro(error) {
  throw new Error(error.message || "Não foi possível concluir a operação.");
}

export async function buscarVendas() {
  const { data, error } = await supabase.from("vendas").select("*").order("created_at", { ascending: false });
  if (error) tratarErro(error);
  return data;
}

export async function registrarVenda(produtoId, quantidade) {
  const quantidadeNumerica = Number(quantidade);
  if (!Number.isInteger(quantidadeNumerica) || quantidadeNumerica <= 0) {
    throw new Error("Informe uma quantidade inteira válida.");
  }

  const { error } = await supabase.rpc("registrar_venda", {
    p_produto_id: produtoId,
    p_quantidade: quantidadeNumerica
  });
  if (error) tratarErro(error);
}
