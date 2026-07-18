import { useEffect, useState } from "react";
import { atualizarPerfil, buscarUsuario } from "../services/authService";

const inicial = { nome: "", sobrenome: "", telefone: "", dataNascimento: "", email: "" };

function Perfil() {
  const [perfil, setPerfil] = useState(inicial);
  const [emailInicial, setEmailInicial] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    let ativo = true;
    buscarUsuario().then((usuario) => {
      if (!ativo) return;
      const dados = usuario.user_metadata || {};
      setPerfil({ nome: dados.nome || "", sobrenome: dados.sobrenome || "", telefone: dados.telefone || "", dataNascimento: dados.data_nascimento || "", email: usuario.email || "" });
      setEmailInicial(usuario.email || "");
    }).catch((error) => ativo && setErro(error.message));
    return () => { ativo = false; };
  }, []);

  async function salvar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");
    setSalvando(true);
    try {
      await atualizarPerfil(perfil);
      setEmailInicial(perfil.email);
      setMensagem(perfil.email !== emailInicial ? "Dados atualizados. Confirme o novo e-mail para concluir a alteração." : "Dados atualizados com sucesso.");
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return <div className="perfil"><h1>Meu perfil</h1><p>Consulte e mantenha seus dados atualizados.</p>{erro && <p className="mensagem erro">{erro}</p>}{mensagem && <p className="mensagem sucesso">{mensagem}</p>}
    <form onSubmit={salvar} className="perfil-form"><label>Nome<input value={perfil.nome} onChange={(event) => setPerfil({ ...perfil, nome: event.target.value })} autoComplete="given-name" required /></label><label>Sobrenome<input value={perfil.sobrenome} onChange={(event) => setPerfil({ ...perfil, sobrenome: event.target.value })} autoComplete="family-name" required /></label><label>Telefone<input type="tel" value={perfil.telefone} onChange={(event) => setPerfil({ ...perfil, telefone: event.target.value })} autoComplete="tel" required /></label><label>Data de nascimento<input type="date" value={perfil.dataNascimento} onChange={(event) => setPerfil({ ...perfil, dataNascimento: event.target.value })} autoComplete="bday" required /></label><label className="campo-total">E-mail<input type="email" value={perfil.email} onChange={(event) => setPerfil({ ...perfil, email: event.target.value })} autoComplete="email" required /></label><button type="submit" disabled={salvando}>{salvando ? "Salvando..." : "Salvar alterações"}</button></form>
  </div>;
}

export default Perfil;
