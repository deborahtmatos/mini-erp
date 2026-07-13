import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ShoppingCart 
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
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

        <Link to="/estoque">
          <Warehouse size={20} />
          Estoque
        </Link>

        <Link to="/vendas">
          <ShoppingCart size={20} />
          Vendas
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;