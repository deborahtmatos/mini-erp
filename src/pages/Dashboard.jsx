function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Produtos</h3>
          <p>0 cadastrados</p>
        </div>

        <div className="card">
          <h3>Estoque</h3>
          <p>0 itens</p>
        </div>

        <div className="card">
          <h3>Vendas</h3>
          <p>R$ 0,00</p>
        </div>

        <div className="card">
          <h3>Alertas</h3>
          <p>Nenhum alerta</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;