import { supabase } from "../lib/supabase";

function validarProduto(produto) {
  const nome = produto.nome?.trim();
  const preco = Number(String(produto.preco).replace(",", "."));
  const quantidade = Number(produto.quantidade);

  if (!nome) throw new Error("Informe o nome do produto.");
  if (!Number.isFinite(preco) || preco < 0) throw new Error("Informe um preço válido.");
  if (!Number.isInteger(quantidade) || quantidade < 0) throw new Error("Informe uma quantidade inteira válida.");

  return { nome, categoria: produto.categoria?.trim() || "", preco, quantidade };
}

function tratarErro(error) {
  throw new Error(error.message || "Não foi possível concluir a operação.");
}

export async function buscarProdutos() {
  const { data, error } = await supabase.from("produtos").select("*").order("nome");
  if (error) tratarErro(error);
  return data;
}

export async function adicionarProduto(produto) {
  const { data, error } = await supabase.from("produtos").insert(validarProduto(produto)).select().single();
  if (error) tratarErro(error);
  return data;
}

export async function atualizarProduto(id, produto) {
  const { data, error } = await supabase.from("produtos").update(validarProduto(produto)).eq("id", id).select().single();
  if (error) tratarErro(error);
  return data;
}

export async function removerProduto(id) {
  const { error } = await supabase.from("produtos").delete().eq("id", id);
  if (error) tratarErro(error);
}
