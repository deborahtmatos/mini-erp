import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import Vendas from "./pages/Vendas";
import Movimentacoes from "./pages/Movimentacoes";
import Relatorios from "./pages/Relatorios";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Sidebar />

        <main className="content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/produtos"
              element={<Produtos />}
            />

            <Route
              path="/estoque"
              element={<Estoque />}
            />

            <Route
              path="/vendas"
              element={<Vendas />}
            />

            <Route
              path="/movimentacoes"
              element={<Movimentacoes />}
            />

            <Route
              path="/relatorios"
              element={<Relatorios />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;