import "./App.css";
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [results, setResults] = useState(null);

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile && uploadedFile.type === "text/plain") {
      setFile(uploadedFile);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(uploadedFile);
    } else {
      alert("Selecione um arquivo .txt");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const searchWordsInFile = () => {
    if (!fileContent || !searchWords.trim()) {
      alert("Faça upload de um arquivo e digite as palavras para buscar.");
      return;
    }

    const wordsToSearch = searchWords.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const content = fileContent.toLowerCase();
    
    const searchResults = wordsToSearch.map(searchWord => {
      const count = (content.match(new RegExp(searchWord, 'g')) || []).length;
      
      return {
        word: searchWord,
        count: count
      };
    });

    setResults(searchResults);
  };

  const resetSearch = () => {
    setFile(null);
    setFileContent("");
    setSearchWords("");
    setResults(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/Component 1.svg" alt="Findy Logo" className="logo-icon" />
        </div>
        <nav className="nav">
          <a href="#upload" className="nav-button">Upload</a>
          <a href="#sobre" className="nav-button">Sobre</a>
          <a href="#footer" className="nav-button">Contato</a>
        </nav>
      </header>

      <main className="main">
        <h1 className="main-title">
          Encontre qualquer<br />
          <span className="highlight">palavra em segundos</span>
        </h1>
        <p className="main-subtitle">
          Faça upload do seu arquivo de texto e encontre palavras desejadas com nossa ferramenta de análise de .txt
        </p>

        <section id="upload">
          {!file ? (
            <div className="upload-container">
              <div 
                className="upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <div className="upload-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L12 8M12 8L15 11M12 8L9 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 15V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="upload-text-large">Solte seu arquivo aqui</p>
                <p className="upload-text-small">
                  ou clique para navegar em seus arquivos
                </p>
                <input
                  id="file-input"
                  type="file"
                  accept=".txt"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          ) : (
            <div className="search-container">
              <div className="file-info">
                <span className="file-name"> {file.name}</span>
                <button className="reset-button" onClick={resetSearch}> Novo arquivo</button>
              </div>
              
              <div className="search-section">
                <input
                  type="text"
                  placeholder="Digite as palavras separadas por espaço (ex: texto arquivo documento)"
                  value={searchWords}
                  onChange={(e) => setSearchWords(e.target.value)}
                  className="search-input"
                />
                <button 
                  className="search-button"
                  onClick={searchWordsInFile}
                >
                   Buscar
                </button>
              </div>

              {results && (
                <div className="results-container">
                  <h3>Resultados</h3>
                  {results.map((result, index) => (
                    <div key={index} className="result-item">
                      <div className="result-header">
                        <span className="search-word">"{result.word}"</span>
                        <span className="match-count">{result.count} encontradas</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section id="sobre" className="section">
          <h2>Sobre o <img src="/findy.svg" alt="Findy Logo" className="section-logo" /></h2>
          <p>
            O Findy é uma ferramenta simples e eficiente para encontrar palavras em arquivos de texto. 
            Desenvolvido com foco na simplicidade e velocidade, permite que você localize rapidamente 
            as informações que precisa em seus documentos.
          </p>
          <div className="features">
            <div className="feature">
              <h3> Rápido</h3>
              <p>Processamento instantâneo de arquivos de texto</p>
            </div>
            <div className="feature">
              <h3> Seguro</h3>
              <p>100% processamento local - seus arquivos nunca saem do seu dispositivo</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="footer-left">
          <p className="privacy-text">
            Processamento 100% local - Seus arquivos permanecem seguros no seu dispositivo.
          </p>
        </div>
        <div className="footer-center">
          <a href="https://www.linkedin.com/in/bruno-santanadev/" className="developer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            brunospb.dev
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
