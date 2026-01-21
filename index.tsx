
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Garantia para o navegador reconhecer o objeto process.env injetado pelo Netlify
// Fix: Added 'as any' cast to access 'process' property on window without TypeScript errors
if (typeof window !== 'undefined' && !(window as any).process) {
  (window as any).process = { env: {} };
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
    console.error("Erro crítico na renderização do React:", error);
  }
};

renderApp();
