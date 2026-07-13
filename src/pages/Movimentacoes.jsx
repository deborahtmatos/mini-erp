import { useEffect, useState } from "react";

import {
  buscarMovimentacoes
} from "../services/movimentacaoService";



function Movimentacoes() {


  const [movimentacoes, setMovimentacoes] = useState([]);




  useEffect(() => {


    carregarMovimentacoes();


  }, []);






  function carregarMovimentacoes() {


    const dados = buscarMovimentacoes();



    const ordenadas = [...dados].reverse();



    setMovimentacoes(ordenadas);



  }







  return (


    <div>


      <h1>
        Histórico de Movimentações
      </h1>





      {movimentacoes.length === 0 ? (


        <p>
          Nenhuma movimentação registrada.
        </p>



      ) : (





        <table>


          <thead>


            <tr>


              <th>Data</th>


              <th>Produto</th>


              <th>Tipo</th>


              <th>Quantidade</th>


            </tr>


          </thead>







          <tbody>





            {movimentacoes.map((item) => (





              <tr key={item.id}>




                <td>

                  {item.data}

                </td>






                <td>

                  {item.produto}

                </td>






                <td>

                  {item.tipo}

                </td>






                <td>

                  {item.quantidade}

                </td>





              </tr>





            ))}






          </tbody>






        </table>





      )}






    </div>



  );



}





export default Movimentacoes;