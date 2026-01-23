
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Shim para garantir que process.env.API_KEY funcione no navegador sem o bundle do Vite expô-lo publicamente
if (typeof window !== 'undefined') {
  const win = window as any;
  win.process = win.process || {};
  win.process.env = win.process.env || {};
  
  // Caso a plataforma injete em variáveis globais diferentes
  if (!win.process.env.API_KEY && win.API_KEY) {
    win.process.env.API_KEY = win.API_KEY;
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
    console.error("Falha ao iniciar Lumina Optics:", error);
  }
};

renderApp();
