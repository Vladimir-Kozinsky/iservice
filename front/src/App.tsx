import React from 'react';
import logo from './logo.svg';
import s from './App.module.css';

function App() {
  return (
    <div className={s.App}>
      <header className={s.AppHeader}>
        <img src={logo} className={s.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={s.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
