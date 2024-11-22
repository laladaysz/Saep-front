import React, { useState } from 'react';
import Register from './components/Register';

function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Bem-vindo ao Sistema</h1>
      <button
        onClick={toggleModal}
        style={{ display: 'block', marginTop: '20px', width: '100%' }}
      >
        Cadastrar Usuário
      </button>

      {showModal && (
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
          <Register closeModal={toggleModal} />
        </div>
      )}
    </div>
  );
}

export default App;
