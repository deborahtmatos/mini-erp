import { supabase } from "../lib/supabase";

function tratarErro(error) {
  throw new Error(error.message || "Não foi possível concluir a autenticação.");
}

export async function entrar(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) tratarErro(error);
  return data.session;
}

export async function cadastrar({ nome, sobrenome, telefone, dataNascimento, email, senha }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: {
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        telefone: telefone.trim(),
        data_nascimento: dataNascimento
      }
    }
  });
  if (error) tratarErro(error);
  return data;
}

export async function sair() {
  const { error } = await supabase.auth.signOut();
  if (error) tratarErro(error);
}

export async function buscarUsuario() {
  const { data, error } = await supabase.auth.getUser();
  if (error) tratarErro(error);
  return data.user;
}

export async function atualizarPerfil({ nome, sobrenome, telefone, dataNascimento, email }) {
  const { data, error } = await supabase.auth.updateUser({
    email: email.trim(),
    data: {
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      telefone: telefone.trim(),
      data_nascimento: dataNascimento
    }
  });
  if (error) tratarErro(error);
  return data.user;
}
