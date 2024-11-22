import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegisterTarefa({ closeModal }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [setor, setSetor] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('Pendente');  
  const [usuarios, setUsuarios] = useState([]); 
  const [userId, setUserId] = useState(''); 
  const [message, setMessage] = useState('');

  // Função para buscar os usuários
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setUsuarios(response.data); 
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tarefa/criar/', {  
        titulo,
        descricao,
        setor,
        prioridade,
        status,  
        user: userId, 
      });
      setMessage(`Tarefa cadastrada com sucesso: ${response.data.titulo}`);
      setTitulo('');
      setDescricao('');
      setSetor('');
      setPrioridade('');
      setStatus('Pendente');  
      setUserId('');
    } catch (error) {
      setMessage(`Erro ao cadastrar tarefa: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Cadastro de Tarefa</h2>
      <form onSubmit={handleRegister} style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        {/* Dropdown para selecionar o responsável (usuário) */}
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        >
          <option value="" disabled>Selecione o responsável</option>
          {usuarios.map((user) => (
            <option key={user.id} value={user.id}>{user.nome}</option>
          ))}
        </select>

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
          Cadastrar Tarefa
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

export default RegisterTarefa;
