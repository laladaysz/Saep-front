import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskBoard.css"

function TaskBoard() {
  const [tarefas, setTarefas] = useState({
    pendente: [],
    emAndamento: [],
    concluido: [],
  });

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tarefa/todas/");
        const allTarefas = response.data;

        // Separar tarefas por status
        const pendente = allTarefas.filter((tarefa) => tarefa.status === "Pendente");
        const emAndamento = allTarefas.filter((tarefa) => tarefa.status === "Em Andamento");
        const concluido = allTarefas.filter((tarefa) => tarefa.status === "Concluído");

        setTarefas({ pendente, emAndamento, concluido });
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTarefas();
  }, []);

  const renderTarefas = (tasks) =>
    tasks.map((tarefa) => (
      <div key={tarefa.id} className="taskboard-card">
        <h4>{tarefa.titulo}</h4>
        <p>{tarefa.descricao}</p>
        <p>
          <strong>Setor:</strong> {tarefa.setor}
        </p>
        <p>
          <strong>Prioridade:</strong> {tarefa.prioridade}
        </p>
      </div>
    ));
  

    return (
        <div className="taskboard-container">
          {/* Coluna Pendente */}
          <div className="taskboard-column">
            <h3>Pendente</h3>
            {renderTarefas(tarefas.pendente)}
          </div>
      
          {/* Coluna Em Andamento */}
          <div className="taskboard-column">
            <h3>Em Andamento</h3>
            {renderTarefas(tarefas.emAndamento)}
          </div>
      
          {/* Coluna Concluído */}
          <div className="taskboard-column">
            <h3>Concluído</h3>
            {renderTarefas(tarefas.concluido)}
          </div>
        </div>
      );
      
}

export default TaskBoard;
