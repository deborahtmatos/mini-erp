import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { supabase } from "./lib/supabase";
import Autenticacao from "./pages/Autenticacao";
import Dashboard from "./pages/Dashboard";
import Estoque from "./pages/Estoque";
import Movimentacoes from "./pages/Movimentacoes";
import Perfil from "./pages/Perfil";
import Produtos from "./pages/Produtos";
import Relatorios from "./pages/Relatorios";
import Vendas from "./pages/Vendas";
import { sair } from "./services/authService";

function App() {
  const [sessao, setSessao] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return;
      setSessao(data.session);
      setCarregando(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSessao(novaSessao);
      setCarregando(false);
    });
    return () => { ativo = false; listener.subscription.unsubscribe(); };
  }, []);

  async function encerrarSessao() {
    try { await sair(); } catch (error) { window.alert(error.message); }
  }

  if (carregando) return <main className="auth"><p>Carregando...</p></main>;
  if (!sessao) return <Autenticacao />;

  return <BrowserRouter><div className="app"><Sidebar email={sessao.user.email} onLogout={encerrarSessao} /><main className="content"><Routes>
    <Route path="/" element={<Dashboard />} /><Route path="/produtos" element={<Produtos />} /><Route path="/estoque" element={<Estoque />} /><Route path="/vendas" element={<Vendas />} /><Route path="/movimentacoes" element={<Movimentacoes />} /><Route path="/relatorios" element={<Relatorios />} /><Route path="/perfil" element={<Perfil />} />
  </Routes></main></div></BrowserRouter>;
}

export default App;
