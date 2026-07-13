import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ShoppingCart 
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">Mini ERP</h1>

      <nav>
        <a href="#">
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a href="#">
          <Package size={20} />
          Produtos
        </a>

        <a href="#">
          <Warehouse size={20} />
          Estoque
        </a>

        <a href="#">
          <ShoppingCart size={20} />
          Vendas
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;