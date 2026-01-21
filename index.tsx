
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Define o shim global apenas se necessário para evitar erros de referência no navegador
if (typeof window !== 'undefined') {
  const win = window as any;
  if (!win.process) {
    win.process = { env: {} };
  }
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
    console.error("Erro na inicialização da aplicação:", error);
  }
};

renderApp();
