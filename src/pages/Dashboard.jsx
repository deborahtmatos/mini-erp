import { useEffect, useState } from "react";

import {
  buscarProdutos
} from "../services/produtoService";


function Dashboard() {


  const [totalProdutos, setTotalProdutos] = useState(0);

  const [totalEstoque, setTotalEstoque] = useState(0);

  const [valorEstoque, setValorEstoque] = useState(0);

  const [estoqueBaixo, setEstoqueBaixo] = useState(0);





  useEffect(() => {


    carregarDashboard();


  }, []);







  function carregarDashboard() {



    const produtos = buscarProdutos();




    setTotalProdutos(produtos.length);







    const quantidadeTotal = produtos.reduce(


      (total, produto) =>

        total + Number(produto.quantidade || 0),


      0


    );



    setTotalEstoque(quantidadeTotal);








    const valorTotal = produtos.reduce(


      (total, produto) => {



        const preco = Number(

          String(produto.preco)

            .replace(",", ".")

        );



        const quantidade = Number(

          produto.quantidade || 0

        );




        return total + (preco * quantidade);



      },


      0


    );




    setValorEstoque(valorTotal);








    const produtosComEstoqueBaixo = produtos.filter(


      (produto) =>

        Number(produto.quantidade) <= 5


    );




    setEstoqueBaixo(
      produtosComEstoqueBaixo.length
    );



  }







  return (


    <div className="dashboard">



      <h1>
        Dashboard
      </h1>





      <div className="cards">






        <div className="card">


          <h3>
            Produtos cadastrados
          </h3>


          <p>
            {totalProdutos}
          </p>



        </div>








        <div className="card">


          <h3>
            Itens em estoque
          </h3>


          <p>
            {totalEstoque}
          </p>



        </div>








        <div className="card">


          <h3>
            Valor do estoque
          </h3>


          <p>

            R$ {valorEstoque.toFixed(2)}

          </p>



        </div>








        <div className="card">


          <h3>
            Estoque baixo
          </h3>


          <p>

            {estoqueBaixo}

          </p>



        </div>





      </div>





    </div>



  );


}



export default Dashboard;