import { useState } from "react";
import { cadastrar, entrar } from "../services/authService";

function Autenticacao() {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [dadosCadastro, setDadosCadastro] = useState({ nome: "", sobrenome: "", telefone: "", dataNascimento: "" });
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");
    setEnviando(true);

    try {
      if (modoCadastro) {
        const resultado = await cadastrar({ ...dadosCadastro, email, senha });
        if (resultado.session) {
          setMensagem("Conta criada com sucesso.");
        } else {
          const aviso = "Conta criada. Confirme o link enviado para seu e-mail antes de fazer login.";
          setMensagem(aviso);
          window.alert(aviso);
        }
      } else {
        await entrar(email, senha);
      }
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  }

  function alternarModo() {
    setModoCadastro((atual) => !atual);
    setMensagem("");
    setErro("");
  }

  return <main className="auth"><section className="auth-card"><h1>Mini ERP</h1><p>{modoCadastro ? "Crie sua conta para começar." : "Entre para acessar o sistema."}</p>{erro && <p className="mensagem erro">{erro}</p>}{mensagem && <p className="mensagem sucesso">{mensagem}</p>}
    <form onSubmit={enviar} className="auth-form">{modoCadastro && <><label>Nome<input value={dadosCadastro.nome} onChange={(event) => setDadosCadastro({ ...dadosCadastro, nome: event.target.value })} autoComplete="given-name" required /></label><label>Sobrenome<input value={dadosCadastro.sobrenome} onChange={(event) => setDadosCadastro({ ...dadosCadastro, sobrenome: event.target.value })} autoComplete="family-name" required /></label><label>Telefone<input type="tel" value={dadosCadastro.telefone} onChange={(event) => setDadosCadastro({ ...dadosCadastro, telefone: event.target.value })} autoComplete="tel" required /></label><label>Data de nascimento<input type="date" value={dadosCadastro.dataNascimento} onChange={(event) => setDadosCadastro({ ...dadosCadastro, dataNascimento: event.target.value })} autoComplete="bday" required /></label></>}<label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label><label>Senha<input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} autoComplete={modoCadastro ? "new-password" : "current-password"} minLength="6" required /></label><button type="submit" disabled={enviando}>{enviando ? "Aguarde..." : modoCadastro ? "Criar conta" : "Entrar"}</button></form>
    <button type="button" className="link-button" onClick={alternarModo}>{modoCadastro ? "Já tenho uma conta" : "Criar uma conta"}</button>
  </section></main>;
}

export default Autenticacao;
