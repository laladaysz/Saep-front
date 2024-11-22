import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Bem-vindo ao Sistema de Cadastro e Login</h1>
      {showLogin ? (
        <>
          <Login key="login" />
          <button 
            onClick={() => setShowLogin(false)} 
            style={{ display: 'block', marginTop: '10px', width: '100%' }}>
            Não tem conta? Cadastre-se
          </button>
        </>
      ) : (
        <>
          <Register key="register" />
          <button 
            onClick={() => setShowLogin(true)} 
            style={{ display: 'block', marginTop: '10px', width: '100%' }}>
            Já tem conta? Faça Login
          </button>
        </>
      )}
    </div>
  );
}

export default App;
