import { useState, useEffect } from "react";

function Produtos() {

  const [produtos, setProdutos] = useState([]);

  const [produto, setProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    quantidade: ""
  });


  // Carrega produtos salvos quando abrir a página
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }
  }, []);


  // Salva produtos sempre que houver alteração na lista
  useEffect(() => {
    console.log("Salvando produtos:", produtos);

    localStorage.setItem(
      "produtos",
      JSON.stringify(produtos)
    );

  }, [produtos]);


  function handleChange(event) {
    setProduto({
      ...produto,
      [event.target.name]: event.target.value
    });
  }


  function cadastrarProduto(event) {
    event.preventDefault();

    const novoProduto = {
      id: Date.now(),
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      quantidade: produto.quantidade
    };


    setProdutos([
      ...produtos,
      novoProduto
    ]);


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
          Cadastrar produto
        </button>

      </form>


      <h2>Produtos cadastrados</h2>


      <ul>
        {produtos.map((item) => (
          <li key={item.id}>
            {item.nome} - {item.categoria} -
            R$ {item.preco} -
            Estoque: {item.quantidade}
          </li>
        ))}
      </ul>


    </div>
  );
}

export default Produtos;