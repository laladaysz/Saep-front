import React, { useState } from 'react';
import axios from 'axios';

function Register({ closeModal }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/cadastro/', {
        nome,
        email,
      });
      setMessage(`Usuário cadastrado com sucesso: ${response.data.nome}`);
      setNome('');
      setEmail('');
    } catch (error) {
      setMessage(`Erro ao cadastrar: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Cadastro de Usuário</h2>
      <form onSubmit={handleRegister} style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button
          type="submit"
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Cadastrar
        </button>
        <button
          type="button"
          onClick={closeModal}
          style={{
            display: 'block',
            marginTop: '10px',
            width: '100%',
            backgroundColor: '#f8f9fa',
            color: '#6c757d',
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        >
          Cancelar
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}

export default Register;
