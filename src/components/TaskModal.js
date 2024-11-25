import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskModal.css";  // Não se esqueça de adicionar um arquivo CSS

const TaskModal = ({ tarefa, onClose, onTaskUpdated }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [setor, setSetor] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [erro, setErro] = useState("");  // Não precisa mais da variável de status e user visíveis no frontend

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
      setSetor(tarefa.setor);
      setPrioridade(tarefa.prioridade);
    }
  }, [tarefa]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar o que está sendo enviado
    console.log({
      titulo,
      descricao,
      setor,
      prioridade,
      status: tarefa.status,  // Envia o status da tarefa
      user: tarefa.user,      // Envia o user associado à tarefa
    });

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/tarefa/alterar/${tarefa.id}/`,
        { 
          titulo, 
          descricao, 
          setor, 
          prioridade, 
          status: tarefa.status,  // Envia o status da tarefa
          user: tarefa.user       // Envia o user associado à tarefa
        }
      );

      if (response.status === 200) {
        onTaskUpdated();  // Atualiza a lista de tarefas
        onClose();         // Fecha a modal
      } else {
        setErro(`Erro: ${response.data.detail}`);
      }
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      if (error.response) {
        setErro(`Erro: ${error.response.data.detail || JSON.stringify(error.response.data)}`);
      } else {
        setErro("Erro desconhecido");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Tarefa</h2>
        <form onSubmit={handleSubmit}>
        <p>Título</p>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            required
          />
          <p>Descrição</p>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
          />
          <p>Setor</p>
          <input
            type="text"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            placeholder="Setor"
            required
          />
          <p>Prioridade</p>
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            required
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>

          {/* Exibe erro, caso haja */}
          {erro && <div className="error-message">{erro}</div>}

          <div className="modal-actions">
            <button className="Save" type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
