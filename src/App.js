import React, { useState } from 'react';
import Register from './components/Register';
import RegisterTarefa from './components/RegisterTarefa'; // Importando o novo componente de tarefa

function App() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTarefaModal, setShowTarefaModal] = useState(false);

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  const toggleTarefaModal = () => {
    setShowTarefaModal(!showTarefaModal);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Bem-vindo ao Sistema</h1>
      
      {/* Botão de Cadastro de Usuário */}
      <button
        onClick={toggleUserModal}
        style={{ display: 'block', marginTop: '20px', width: '100%' }}
      >
        Cadastrar Usuário
      </button>

      {/* Botão de Cadastro de Tarefa */}
      <button
        onClick={toggleTarefaModal}
        style={{ display: 'block', marginTop: '20px', width: '100%' }}
      >
        Cadastrar Tarefa
      </button>

      {/* Modal para Cadastro de Usuário */}
      {showUserModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            borderRadius: '8px',
          }}
        >
          <Register closeModal={toggleUserModal} />
        </div>
      )}

      {/* Modal para Cadastro de Tarefa */}
      {showTarefaModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            borderRadius: '8px',
          }}
        >
          <RegisterTarefa closeModal={toggleTarefaModal} />
        </div>
      )}
    </div>
  );
}

export default App;
