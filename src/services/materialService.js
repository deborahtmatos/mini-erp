import { supabase } from "../lib/supabase";

function tratarErro(error) {
  throw new Error(error.message || "Não foi possível concluir a operação.");
}

function validarMaterial(material) {
  const nome = material.nome?.trim();
  const categoria = material.categoria?.trim();
  const unidade = material.unidade?.trim() || "un";

  const precoUnitario = Number(
    String(material.precoUnitario).replace(",", ".")
  );

  const quantidadeEstoque = Number(
    String(material.quantidadeEstoque).replace(",", ".")
  );

  if (!nome) {
    throw new Error("Informe o nome do material.");
  }

  if (!categoria) {
    throw new Error("Selecione uma categoria.");
  }

  if (!Number.isFinite(precoUnitario) || precoUnitario < 0) {
    throw new Error("Informe um preço unitário válido.");
  }

  if (!Number.isFinite(quantidadeEstoque) || quantidadeEstoque < 0) {
    throw new Error("Informe uma quantidade em estoque válida.");
  }

  return {
    nome,
    categoria,
    unidade,
    preco_unitario: precoUnitario,
    quantidade_estoque: quantidadeEstoque,
  };
}

export async function buscarMateriais() {
  const { data, error } = await supabase
    .from("materiais")
    .select("*")
    .order("nome");

  if (error) {
    tratarErro(error);
  }

  return data;
}

export async function adicionarMaterial(material) {
  const { data, error } = await supabase
    .from("materiais")
    .insert(validarMaterial(material))
    .select()
    .single();

  if (error) {
    tratarErro(error);
  }

  return data;
}

export async function atualizarMaterial(id, material) {
  const { data, error } = await supabase
    .from("materiais")
    .update(validarMaterial(material))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    tratarErro(error);
  }

  return data;
}

export async function removerMaterial(id) {
  const { error } = await supabase
    .from("materiais")
    .delete()
    .eq("id", id);

  if (error) {
    tratarErro(error);
  }
}