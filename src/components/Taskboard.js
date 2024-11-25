import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import TaskCard from "./Taskcard";
import TaskModal from "./TaskModal";
import "./TaskBoard.css";

function TaskBoard() {
  const [tarefas, setTarefas] = useState({
    pendente: [],
    emAndamento: [],
    concluido: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do modal
  const [taskToEdit, setTaskToEdit] = useState(null); // Tarefa que será editada

  // Função para buscar as tarefas
  const fetchTarefas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tarefa/todas/");
      const allTarefas = response.data;

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

  const onTaskDeleted = (taskId) => {
    setTarefas((prevTarefas) => {
      const newTarefas = { ...prevTarefas };
      newTarefas.pendente = newTarefas.pendente.filter((tarefa) => tarefa.id !== taskId);
      newTarefas.emAndamento = newTarefas.emAndamento.filter((tarefa) => tarefa.id !== taskId);
      newTarefas.concluido = newTarefas.concluido.filter((tarefa) => tarefa.id !== taskId);
      return newTarefas;
    });
  };

  const onUpdateStatus = (id, newStatus) => {
    axios
      .patch(`http://127.0.0.1:8000/api/tarefa/alterar_status/${id}/`, { status: newStatus })
      .then(() => {
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
        onTaskDeleted={onTaskDeleted}
        onTaskEdited={(tarefa) => {
          setTaskToEdit(tarefa);  // Passa a tarefa a ser editada para o estado
          setIsModalOpen(true);    // Abre o modal de edição
        }}
      />
    ));

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

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
    setTaskToEdit(null);    // Limpa a tarefa a ser editada
  };

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

      {isModalOpen && (
        <TaskModal
          tarefa={taskToEdit}
          onClose={closeModal}
          onTaskUpdated={fetchTarefas}  // Recarrega as tarefas ao atualizar
        />
      )}
    </div>
  );
}

export default TaskBoard;
