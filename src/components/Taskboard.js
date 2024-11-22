import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./Taskcard"; // Importando o TaskCard
import "./TaskBoard.css";

function TaskBoard() {
  const [tarefas, setTarefas] = useState({
    pendente: [],
    emAndamento: [],
    concluido: [],
  });

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        // Buscar as tarefas
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
  }, []); // Apenas no carregamento inicial

  // Função para renderizar as colunas de tarefas
  const renderColumn = (tasks, columnName) => {
    return (
      <div className="taskboard-column" key={columnName}>
        <h3>{columnName}</h3>
        {tasks.map((tarefa) => (
          <TaskCard key={tarefa.id} tarefa={tarefa} statusColumn={columnName} />
        ))}
      </div>
    );
  };

  return (
    <div className="taskboard-container">
      {renderColumn(tarefas.pendente, "Pendente")}
      {renderColumn(tarefas.emAndamento, "Em Andamento")}
      {renderColumn(tarefas.concluido, "Concluído")}
    </div>
  );
}

export default TaskBoard;
