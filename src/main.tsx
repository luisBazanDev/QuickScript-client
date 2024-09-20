import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { AuthContextProvider } from './context/AuthContext';

const Main = () => {
  // Leer el tema desde localStorage o usar 'light' como predeterminado
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Aplicar el tema al cargar la aplicación
    document.documentElement.setAttribute('data-theme', theme);
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthContextProvider>
      <div className={`theme-${theme}`}>
        <App toggleTheme={toggleTheme} />
      </div>
    </AuthContextProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);