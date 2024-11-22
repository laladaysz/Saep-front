import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import TaskCard from "./Taskcard";
import "./TaskBoard.css";

function TaskBoard() {
  const [tarefas, setTarefas] = useState({
    pendente: [],
    emAndamento: [],
    concluido: [],
  });

  // Define fetchTarefas outside useEffect to make it accessible to other functions
  const fetchTarefas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tarefa/todas/");
      const allTarefas = response.data;

      // Organize tasks by their status
      const pendente = allTarefas.filter((tarefa) => tarefa.status === "Pendente");
      const emAndamento = allTarefas.filter((tarefa) => tarefa.status === "Em Andamento");
      const concluido = allTarefas.filter((tarefa) => tarefa.status === "Concluído");

      setTarefas({ pendente, emAndamento, concluido });
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const onUpdateStatus = (id, newStatus) => {
    // Request to update the status of the task in the backend
    axios
      .patch(`http://127.0.0.1:8000/api/tarefa/alterar_status/${id}/`, { status: newStatus })
      .then(() => {
        // Re-fetch tasks after updating the status
        fetchTarefas();
      })
      .catch((error) => {
        console.error("Erro ao atualizar status da tarefa:", error);
      });
  };

  const moveTaskToColumn = (item, targetColumn) => {
    onUpdateStatus(item.id, targetColumn);
  };

  const renderTarefas = (tasks) =>
    tasks.map((tarefa) => (
      <TaskCard
        key={tarefa.id}
        tarefa={tarefa}
        statusColumn={tarefa.status}
        onUpdateStatus={onUpdateStatus}
      />
    ));

  // Drop handlers for each column
  const [, dropPendente] = useDrop({
    accept: "TASK",
    drop: (item) => moveTaskToColumn(item, "Pendente"),
  });

  const [, dropEmAndamento] = useDrop({
    accept: "TASK",
    drop: (item) => moveTaskToColumn(item, "Em Andamento"),
  });

  const [, dropConcluido] = useDrop({
    accept: "TASK",
    drop: (item) => moveTaskToColumn(item, "Concluído"),
  });

  return (
    <div className="taskboard-container">
      <div className="taskboard-column" ref={dropPendente}>
        <h3>Pendente</h3>
        {renderTarefas(tarefas.pendente)}
      </div>

      <div className="taskboard-column" ref={dropEmAndamento}>
        <h3>Em Andamento</h3>
        {renderTarefas(tarefas.emAndamento)}
      </div>

      <div className="taskboard-column" ref={dropConcluido}>
        <h3>Concluído</h3>
        {renderTarefas(tarefas.concluido)}
      </div>
    </div>
  );
}

export default TaskBoard;
