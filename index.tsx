
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Previne o erro "process is not defined" que causa a tela branca no navegador
if (typeof (window as any).process === 'undefined') {
  (window as any).process = {
    env: {
      // O Netlify injeta as variáveis aqui durante o build se estiver usando um bundler,
      // ou elas podem ser acessadas via ferramentas de build.
      API_KEY: "" 
    }
  };
}

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro ao renderizar App:", error);
  }
};

renderApp();
