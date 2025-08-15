import "./App.css";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>Início</li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>
      </nav>
      <main>
        <div>
          <h1 className="main-title">Encontre qualquer palavra em segundos</h1>
          <h4 classname="main-subtitle">
            Faça upload do seu arquivo de texxto e encontre palavras desejadas
            com nossa ferramenta de análise de .txt
          </h4>
          <div>
            <p className="upload-text-large">Solte seu arquivo aqui</p>
            <p className="upload-text-small">
              ou clique para navegar em seus arquivos
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
