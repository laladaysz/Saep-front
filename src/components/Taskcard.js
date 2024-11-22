import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import axios from "axios";
import "./TaskCard.css";

const TaskCard = ({ tarefa, statusColumn }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: tarefa.id, status: statusColumn },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [responsavel, setResponsavel] = useState("Carregando...");

  useEffect(() => {
    const fetchResponsavel = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${tarefa.user}/`
        );
        setResponsavel(response.data.nome);
      } catch (error) {
        console.error("Erro ao buscar responsável:", error);
        setResponsavel("Erro ao carregar");
      }
    };

    if (tarefa.user) {
      fetchResponsavel();
    }
  }, [tarefa.user]);

  return (
    <div
      ref={drag}
      className="taskboard-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{tarefa.titulo}</h4>
      <p>{tarefa.descricao}</p>
      <p>
        <strong>Setor:</strong> {tarefa.setor}
      </p>
      <p>
        <strong>Prioridade:</strong> {tarefa.prioridade}
      </p>
      <p>
        <strong>Responsável:</strong> {responsavel}
      </p>
    </div>
  );
};

export default TaskCard;
