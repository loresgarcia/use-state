import { useState } from "react";
import './App.css';

function App() {
  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {
    const cep = evento.target.value;

    setEndereco({ 
      cep 
    });

    if (cep && cep.length === 8) {
      // obtendo o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco((enderecoAntigo) => {
            return {
              ...enderecoAntigo,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf,
            };
          });
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hooks do React - useState</h1>
        <input
          type="number"
          placeholder="Digite o cep"
          onChange={manipularEndereco}
        />
        <div>
          <h2>Endereço</h2>
          <ul>
            <li>CEP: {endereco.cep}</li>
            <li>Rua: {endereco.rua}</li>
            <li>Bairro: {endereco.bairro}</li>
            <li>Cidade: {endereco.cidade}</li>
            <li>Estado: {endereco.estado}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
