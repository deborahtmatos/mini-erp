import { useState, useEffect } from "react";

import {
  buscarProdutos,
  adicionarProduto,
  atualizarProduto,
  removerProduto
} from "../services/produtoService";


function Produtos() {


  const [produtos, setProdutos] = useState([]);


  const [produto, setProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    quantidade: ""
  });


  const [editando, setEditando] = useState(null);



  // Carrega produtos ao abrir a tela
  useEffect(() => {

    const produtosSalvos = buscarProdutos();

    setProdutos(produtosSalvos);

  }, []);




  function handleChange(event) {

    setProduto({

      ...produto,
      [event.target.name]: event.target.value

    });

  }





  function cadastrarProduto(event) {

    event.preventDefault();



    if (editando) {


      const produtoAtualizado = {

        id: editando,
        ...produto

      };


      const produtosAtualizados =
        atualizarProduto(produtoAtualizado);


      setProdutos(produtosAtualizados);


      setEditando(null);



    } else {



      const novoProduto = {

        id: Date.now(),
        ...produto

      };


      const produtosAtualizados =
        adicionarProduto(novoProduto);



      setProdutos(produtosAtualizados);


    }



    limparFormulario();

  }






  function editarProduto(item) {


    setProduto({

      nome: item.nome,
      categoria: item.categoria,
      preco: item.preco,
      quantidade: item.quantidade

    });



    setEditando(item.id);


  }







  function excluirProduto(id) {


    const produtosAtualizados =
      removerProduto(id);



    setProdutos(produtosAtualizados);


  }






  function limparFormulario() {


    setProduto({

      nome: "",
      categoria: "",
      preco: "",
      quantidade: ""

    });


  }






  return (

    <div>


      <h1>Produtos</h1>


      <p>
        Total de produtos: {produtos.length}
      </p>




      <form onSubmit={cadastrarProduto}>


        <input
          name="nome"
          placeholder="Nome do produto"
          value={produto.nome}
          onChange={handleChange}
        />



        <input
          name="categoria"
          placeholder="Categoria"
          value={produto.categoria}
          onChange={handleChange}
        />



        <input
          name="preco"
          placeholder="Preço"
          value={produto.preco}
          onChange={handleChange}
        />



        <input
          name="quantidade"
          placeholder="Quantidade"
          value={produto.quantidade}
          onChange={handleChange}
        />



        <button type="submit">

          {editando
            ? "Salvar alteração"
            : "Cadastrar produto"}

        </button>



        {editando && (

          <button

            type="button"

            onClick={() => {

              setEditando(null);
              limparFormulario();

            }}

          >

            Cancelar

          </button>

        )}



      </form>





      <h2>
        Produtos cadastrados
      </h2>





      <table>


        <thead>

          <tr>

            <th>Produto</th>

            <th>Categoria</th>

            <th>Preço</th>

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
                R$ {item.preco}
              </td>


              <td>
                {item.quantidade}
              </td>



              <td>


                <button

                  onClick={() => editarProduto(item)}

                >

                  ✏️ Editar

                </button>



                <button

                  onClick={() => excluirProduto(item.id)}

                >

                  🗑️ Excluir

                </button>



              </td>



            </tr>


          ))}



        </tbody>



      </table>




    </div>


  );


}


export default Produtos;