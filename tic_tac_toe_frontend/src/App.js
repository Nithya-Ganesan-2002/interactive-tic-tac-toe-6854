import React, { useState, useEffect } from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app rendering container, applies app-wide theme and hosts Tic Tac Toe game.
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "100vh", background: "var(--bg-secondary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <TicTacToe />
      </header>
    </div>
  );
}

export default App;
