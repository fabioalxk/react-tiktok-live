import React, { useState, useEffect } from "react";
import "./Home.scss";

function Home() {
  const [quizActive, setQuizActive] = useState(false);
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(null);
  const [userScores, setUserScores] = useState({});
  const [ranking, setRanking] = useState([]);
  const [votes, setVotes] = useState({ option1: 0, option2: 0 }); // Estado para armazenar os votos
  const [usersVoted, setUsersVoted] = useState(new Set()); // Armazena os usuários que votaram

  useEffect(() => {
    // Pega o liveId da URL (query param)
    const query = new URLSearchParams(window.location.search);
    const liveId = query.get("liveId"); // Exemplo: ?liveId=@fabioalxk

    if (liveId) {
      // Estabelece a conexão WebSocket com o servidor Node.js
      const ws = new WebSocket(`ws://localhost:3000`);

      ws.onopen = () => {
        console.log("Conectado ao WebSocket");
        ws.send(liveId); // Envia o liveId para o servidor
      };

      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);

        if (data.type === "chat" && quizActive) {
          let userResponse = data.comment.trim();
          if (userResponse === "1" || userResponse === "2") {
            processUserResponse(data.uniqueId, userResponse); // Captura userId e o voto
          }
        }
      };
    }
  }, [quizActive]);

  // Função para processar a resposta do usuário
  function processUserResponse(userId, response) {
    // Verifica se o usuário já votou neste quiz
    if (usersVoted.has(userId)) {
      console.log(`Usuário ${userId} já votou neste quiz.`);
      return;
    }

    // Marca o usuário como tendo votado
    setUsersVoted((prevVoted) => new Set(prevVoted).add(userId));

    // Inicializa o usuário no ranking se ele ainda não existir
    setUserScores((prevScores) => {
      const newScores = { ...prevScores };
      if (!newScores[userId]) {
        newScores[userId] = { userId: userId, score: 0 }; // Inicializa com 0 pontos
      }
      return newScores;
    });

    // Atualiza os votos dinamicamente
    if (response === "1") {
      setVotes((prevVotes) => ({
        ...prevVotes,
        option1: prevVotes.option1 + 1,
      }));
    } else if (response === "2") {
      setVotes((prevVotes) => ({
        ...prevVotes,
        option2: prevVotes.option2 + 1,
      }));
    }
  }

  // Função para abrir o Quiz
  function openQuiz() {
    setQuizActive(true);
    setQuizCorrectAnswer(null);
    setVotes({ option1: 0, option2: 0 }); // Reiniciar os votos quando o quiz abre
    setUsersVoted(new Set()); // Limpa os usuários que votaram no quiz anterior
    document.getElementById("quizStatus").textContent =
      "Quiz aberto! Digite 1 para aceitar o truco ou 2 para correr!";
  }

  // Função para fechar o Quiz com a resposta correta
  function closeQuiz(correctAnswer) {
    setQuizActive(false);
    setQuizCorrectAnswer(correctAnswer);
    document.getElementById(
      "quizStatus"
    ).textContent = `Quiz encerrado! A resposta correta foi ${correctAnswer}.`;

    // Atualiza os pontos dos usuários que acertaram
    const updatedScores = { ...userScores };
    usersVoted.forEach((userId) => {
      if (correctAnswer && userScores[userId]) {
        if (userScores[userId].lastVote === correctAnswer) {
          updatedScores[userId].score++; // Incrementa a pontuação dos que acertaram
        }
      }
    });

    setUserScores(updatedScores);
    updateRanking(); // Atualiza o ranking após o encerramento do quiz
  }

  // Função para atualizar o ranking após o quiz
  function updateRanking() {
    const rankingArray = Object.values(userScores).sort(
      (a, b) => b.score - a.score
    );
    setRanking(rankingArray);
  }

  return (
    <div className="home-container">
      {/* Parte de cima com as opções */}
      <div className="vote-container">
        <h2>Digite uma das opções no chat:</h2>
        <div className="vote-cards">
          <div className="vote-card option-1">
            Opção 1 - Aceitar Truco
            <br />
            {votes.option1} votos
          </div>
          <div className="vote-card option-2">
            Opção 2 - Correr
            <br />
            {votes.option2} votos
          </div>
        </div>
      </div>

      {/* Controles do operador */}
      <div id="quizControls">
        <button onClick={openQuiz}>Abrir Quiz</button>
        <button onClick={() => closeQuiz("1")}>Encerrar com Resposta 1</button>
        <button onClick={() => closeQuiz("2")}>Encerrar com Resposta 2</button>
        <p id="quizStatus">Aguardando início do quiz...</p>
      </div>

      {/* Parte de baixo com o ranking */}
      <div className="ranking-container">
        <h3>Ranking dos Participantes</h3>
        <table id="rankingTable">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Usuário</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.length > 0 ? (
              ranking.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.userId}</td>
                  <td>{user.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum usuário votou ainda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
