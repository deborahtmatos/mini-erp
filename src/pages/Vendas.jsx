import { useEffect, useState } from "react";

import {
  buscarProdutos,
  atualizarProduto
} from "../services/produtoService";


import {
  adicionarMovimentacao
} from "../services/movimentacaoService";



function Vendas() {


  const [produtos, setProdutos] = useState([]);

  const [vendas, setVendas] = useState([]);


  const [venda, setVenda] = useState({

    produtoId: "",
    quantidade: ""

  });






  useEffect(() => {

    carregarProdutos();

    carregarVendas();

  }, []);







  function carregarProdutos() {

    const produtosSalvos = buscarProdutos();

    setProdutos(produtosSalvos);

  }







  function carregarVendas() {


    const vendasSalvas =
      localStorage.getItem("vendas");



    if (vendasSalvas) {

      setVendas(
        JSON.parse(vendasSalvas)
      );

    }


  }







  function salvarVendas(vendasAtualizadas) {


    localStorage.setItem(

      "vendas",

      JSON.stringify(vendasAtualizadas)

    );


  }








  function handleChange(event) {


    setVenda({

      ...venda,

      [event.target.name]:
        event.target.value

    });


  }









  function realizarVenda(event) {


    event.preventDefault();





    const produtoSelecionado =
      produtos.find(

        (produto) =>
          produto.id === Number(venda.produtoId)

      );







    if (!produtoSelecionado) {


      alert("Selecione um produto");


      return;


    }








    const quantidadeVendida =
      Number(venda.quantidade);








    if (
      !quantidadeVendida ||
      quantidadeVendida <= 0
    ) {


      alert("Informe uma quantidade válida");


      return;


    }









    if (
      quantidadeVendida >
      Number(produtoSelecionado.quantidade)
    ) {


      alert("Estoque insuficiente");


      return;


    }









    const novoEstoque =

      Number(produtoSelecionado.quantidade)
      -
      quantidadeVendida;








    const produtoAtualizado = {


      ...produtoSelecionado,


      quantidade: novoEstoque


    };








    atualizarProduto(produtoAtualizado);









    const movimentacaoId = Date.now();




    adicionarMovimentacao({


      id: movimentacaoId,


      produtoId: produtoSelecionado.id,


      data:
        new Date().toLocaleString("pt-BR"),


      produto:
        produtoSelecionado.nome,


      tipo:
        "Venda",


      quantidade:
        quantidadeVendida


    });








    const preco = Number(

      String(produtoSelecionado.preco)
        .replace(",", ".")

    );






    const novaVenda = {


      id: movimentacaoId,


      produtoId: produtoSelecionado.id,


      produto:
        produtoSelecionado.nome,


      quantidade:
        quantidadeVendida,


      valor:
        preco * quantidadeVendida,



      data:
        new Date().toLocaleString("pt-BR")


    };









    const vendasAtualizadas = [


      ...vendas,


      novaVenda


    ];







    setVendas(vendasAtualizadas);


    salvarVendas(vendasAtualizadas);







    carregarProdutos();





    setVenda({

      produtoId: "",

      quantidade: ""

    });



  }












  return (


    <div>


      <h1>
        Vendas
      </h1>








      <form onSubmit={realizarVenda}>



        <select


          name="produtoId"


          value={venda.produtoId}


          onChange={handleChange}


        >



          <option value="">


            Selecione o produto


          </option>







          {produtos.map((produto) => (



            <option


              key={produto.id}


              value={produto.id}


            >


              {produto.nome}

              {" - Estoque: "}

              {produto.quantidade}


            </option>



          ))}



        </select>








        <input


          type="number"


          name="quantidade"


          placeholder="Quantidade"


          value={venda.quantidade}


          onChange={handleChange}


        />








        <button type="submit">


          Finalizar venda


        </button>





      </form>









      <h2>
        Vendas realizadas
      </h2>







      <table>



        <thead>


          <tr>


            <th>Data</th>

            <th>Produto</th>

            <th>Quantidade</th>

            <th>Valor</th>


          </tr>


        </thead>







        <tbody>





          {vendas.map((item) => (



            <tr key={item.id}>


              <td>
                {item.data}
              </td>


              <td>
                {item.produto}
              </td>


              <td>
                {item.quantidade}
              </td>


              <td>

                R$ {Number(item.valor || 0).toFixed(2)}

              </td>



            </tr>



          ))}





        </tbody>




      </table>





    </div>



  );


}



export default Vendas;