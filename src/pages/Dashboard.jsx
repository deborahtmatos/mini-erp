import { useEffect, useState } from "react";

function Dashboard() {

  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalEstoque, setTotalEstoque] = useState(0);
  const [valorEstoque, setValorEstoque] = useState(0);


  useEffect(() => {

    const produtosSalvos = localStorage.getItem("produtos");


    if (produtosSalvos) {

      const produtos = JSON.parse(produtosSalvos);


      setTotalProdutos(produtos.length);


      const quantidade = produtos.reduce(
        (total, produto) =>
          total + Number(produto.quantidade),
        0
      );


      setTotalEstoque(quantidade);


      const valor = produtos.reduce(
        (total, produto) => {

          const preco = Number(
            produto.preco
              .replace(",", ".")
          );

          const quantidade = Number(
            produto.quantidade
          );


          return total + (preco * quantidade);

        },
        0
      );


      setValorEstoque(valor);

    }


  }, []);



  return (

    <div className="dashboard">

      <h1>Dashboard</h1>


      <div className="cards">


        <div className="card">

          <h3>Produtos cadastrados</h3>

          <p>{totalProdutos}</p>

        </div>



        <div className="card">

          <h3>Total em estoque</h3>

          <p>{totalEstoque}</p>

        </div>



        <div className="card">

          <h3>Valor do estoque</h3>

          <p>
            R$ {valorEstoque.toFixed(2)}
          </p>

        </div>



        <div className="card">

          <h3>Alertas</h3>

          <p>
            {totalEstoque === 0
              ? "Sem estoque"
              : "Estoque normal"}
          </p>

        </div>


      </div>


    </div>

  );

}

export default Dashboard;