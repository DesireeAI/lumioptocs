
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Erro fatal: Elemento #root não encontrado no HTML.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro durante a renderização inicial do React:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h1 style="color: #333;">Lumina Optics</h1>
        <p>Desculpe, ocorreu um erro ao carregar o site.</p>
        <p style="font-size: 12px; color: #888;">Detalhes técnicos foram enviados ao console do desenvolvedor.</p>
      </div>
    `;
  }
};

// Garante que o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
