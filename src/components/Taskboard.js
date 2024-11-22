import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskBoard.css";

function TaskBoard() {
  const [tarefas, setTarefas] = useState({
    pendente: [],
    emAndamento: [],
    concluido: [],
  });
  const [users, setUsers] = useState({}); // Armazena os nomes dos usuários por ID

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

        // Buscar os usuários associados às tarefas
        const userIds = [...new Set(allTarefas.map((tarefa) => tarefa.user))]; 
        const userResponses = await Promise.all(
          userIds.map((id) =>
            axios.get(`http://127.0.0.1:8000/api/users/${id}/`).then((res) => ({
              id,
              nome: res.data.nome,
            }))
          )
        );

        // Mapeia os IDs para nomes
        const userMap = userResponses.reduce((map, user) => {
          map[user.id] = user.nome;
          return map;
        }, {});
        setUsers(userMap);

      } catch (error) {
        console.error("Erro ao buscar tarefas ou usuários:", error);
      }
    };

    fetchTarefas();
  }, []); // Apenas no carregamento inicial

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
        <p>
            <strong>Responsável:</strong> {users[tarefa.user] || "Carregando..."}
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
