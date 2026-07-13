import { useEffect, useState } from "react";

import {
  buscarProdutos,
  atualizarProduto
} from "../services/produtoService";


function Estoque() {


  const [produtos, setProdutos] = useState([]);




  useEffect(() => {

    carregarEstoque();

  }, []);




  function carregarEstoque() {

    const produtosSalvos = buscarProdutos();

    setProdutos(produtosSalvos);

  }





  function alterarEstoque(id, tipo) {


    const produto = produtos.find(
      (item) => item.id === id
    );



    let quantidadeAtual =
      Number(produto.quantidade);



    if (tipo === "entrada") {

      quantidadeAtual += 1;

    }



    if (tipo === "saida" && quantidadeAtual > 0) {

      quantidadeAtual -= 1;

    }





    const produtoAtualizado = {

      ...produto,

      quantidade: quantidadeAtual

    };




    atualizarProduto(produtoAtualizado);



    carregarEstoque();


  }






  return (

    <div>


      <h1>
        Estoque
      </h1>



      <table>


        <thead>

          <tr>

            <th>Produto</th>

            <th>Categoria</th>

            <th>Quantidade</th>

            <th>Ações</th>

          </tr>

        </thead>




        <tbody>


          {produtos.map((item) => (


            <tr key={item.id}>


              <td>
                {item.nome}
              </td>


              <td>
                {item.categoria}
              </td>


              <td>
                {item.quantidade}
              </td>



              <td>


                <button
                  onClick={() =>
                    alterarEstoque(item.id, "entrada")
                  }
                >

                  ➕

                </button>




                <button
                  onClick={() =>
                    alterarEstoque(item.id, "saida")
                  }
                >

                  ➖

                </button>



              </td>


            </tr>


          ))}



        </tbody>



      </table>



    </div>

  );


}


export default Estoque;