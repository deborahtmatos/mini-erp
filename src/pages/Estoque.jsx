import { useEffect, useState } from "react";

import {
  buscarProdutos,
  atualizarProduto
} from "../services/produtoService";


function Estoque() {

  const [produtos, setProdutos] = useState([]);

  const [quantidades, setQuantidades] = useState({});



  useEffect(() => {

    carregarEstoque();

  }, []);



  function carregarEstoque() {

    const produtosSalvos = buscarProdutos();

    setProdutos(produtosSalvos);

  }




  function alterarQuantidade(event, id) {

    setQuantidades({

      ...quantidades,

      [id]: event.target.value

    });

  }




  function movimentarEstoque(produto, tipo) {


    const quantidadeMovimentada =
      Number(quantidades[produto.id]);



    if (!quantidadeMovimentada) {
      return;
    }



    let novaQuantidade =
      Number(produto.quantidade);



    if (tipo === "entrada") {

      novaQuantidade += quantidadeMovimentada;

    }



    if (tipo === "saida") {


      if (quantidadeMovimentada > novaQuantidade) {

        alert("Quantidade de saída maior que o estoque");

        return;

      }


      novaQuantidade -= quantidadeMovimentada;

    }



    const produtoAtualizado = {

      ...produto,

      quantidade: novaQuantidade

    };



    atualizarProduto(produtoAtualizado);



    carregarEstoque();



    setQuantidades({

      ...quantidades,

      [produto.id]: ""

    });


  }




  return (

    <div>


      <h1>Estoque</h1>



      <table>


        <thead>

          <tr>

            <th>Produto</th>

            <th>Categoria</th>

            <th>Estoque Atual</th>

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

                <input

                  type="number"

                  value={
                    quantidades[item.id] || ""
                  }

                  onChange={(event) =>
                    alterarQuantidade(
                      event,
                      item.id
                    )
                  }

                />

              </td>



              <td>


                <button

                  onClick={() =>
                    movimentarEstoque(
                      item,
                      "entrada"
                    )
                  }

                >

                  ➕ Entrada

                </button>



                <button

                  onClick={() =>
                    movimentarEstoque(
                      item,
                      "saida"
                    )
                  }

                >

                  ➖ Saída

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