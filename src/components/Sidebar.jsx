import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  History,
  ChartNoAxesCombined,
  UserRound,
  Gem,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar({ email, onLogout }) {
  return (
    <aside className="sidebar">
      <h1 className="logo">Mini ERP</h1>

      <nav>
        <Link to="/">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/produtos">
          <Package size={20} />
          Produtos
        </Link>

        <Link to="/materiais">
          <Gem size={20} />
          Materiais
        </Link>

        <Link to="/estoque">
          <Warehouse size={20} />
          Estoque
        </Link>

        <Link to="/movimentacoes">
          <History size={20} />
          Movimentações
        </Link>

        <Link to="/vendas">
          <ShoppingCart size={20} />
          Vendas
        </Link>

        <Link to="/relatorios">
          <ChartNoAxesCombined size={20} />
          Relatórios
        </Link>

        <Link to="/perfil">
          <UserRound size={20} />
          Meu Perfil
        </Link>
      </nav>

      <div className="sidebar-footer">
        <span title={email}>{email}</span>

        <button
          type="button"
          onClick={() => void onLogout()}
        >
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;