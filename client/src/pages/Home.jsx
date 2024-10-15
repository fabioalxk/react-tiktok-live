import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Home.scss";

function Home() {
  const [quizActive, setQuizActive] = useState(false);
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(null);
  const [userScores, setUserScores] = useState({});
  const [ranking, setRanking] = useState([]);
  const [numberOfVotes, setNumberOfVotes] = useState({
    option1: 0,
    option2: 0,
  });
  const [usersVotes, setUsersVotes] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    newSocket.on("chat", (data) => {
      console.log("chat event", {
        usuario: data.uniqueId,
        comment: data.comment,
      });

      if (quizActive && data.comment) {
        let userResponse = data.comment?.trim();
        if (userResponse == "1" || userResponse == "2") {
          processUserResponse(data.uniqueId, userResponse);
        }
      }
    });

    return () => {
      newSocket.off("chat");
      newSocket.disconnect();
    };
  }, [quizActive]);

  function processUserResponse(userId, userVote) {
    console.log("New valid userVote started to process...", {
      userId,
      userVote,
    });

    setUsersVotes((prevVoted) => {
      if (prevVoted.hasOwnProperty(userId)) {
        console.log(`User already ${userId} voted`);
        return prevVoted; // se o usuário já votou, retornamos o estado anterior
      }

      // Atualiza o estado com o novo voto
      const updatedVotes = { ...prevVoted, [userId]: userVote };

      // Atualiza os scores de usuários (adicione isso aqui para garantir que o estado atualizado seja usado)
      setUserScores((prevScores) => {
        const newScores = { ...prevScores };
        if (!newScores[userId]) {
          newScores[userId] = { userId: userId, score: 0 };
        }
        return newScores;
      });

      // Atualiza o número de votos
      if (userVote === "1") {
        setNumberOfVotes((prevVotes) => ({
          ...prevVotes,
          option1: prevVotes.option1 + 1,
        }));
      } else if (userVote === "2") {
        setNumberOfVotes((prevVotes) => ({
          ...prevVotes,
          option2: prevVotes.option2 + 1,
        }));
      }

      return updatedVotes; // retorna o novo estado atualizado
    });
  }

  function openQuiz() {
    setQuizActive(true);
    setQuizCorrectAnswer(null);
    setNumberOfVotes({ option1: 0, option2: 0 });
    setUsersVotes({});
    console.log("Quiz is open. Users can vote");
  }

  function finishQuiz(correctAnswer) {
    setQuizActive(false);
    setQuizCorrectAnswer(correctAnswer);

    const updatedScores = { ...userScores };
    Object.entries(usersVotes).forEach(([userId, vote]) => {
      if (vote === correctAnswer) {
        updatedScores[userId].score++;
      }
    });

    setUserScores(updatedScores);
    updateRanking();
  }

  function cancelQuiz() {
    setQuizActive(false);
    setNumberOfVotes({ option1: 0, option2: 0 });
    setUsersVotes({});
    console.log("Quiz cancelled.");
  }

  function updateRanking() {
    const rankingArray = Object.values(userScores)?.sort(
      (a, b) => b.score - a.score
    );
    setRanking(rankingArray);
  }

  return (
    <div className="home-container">
      <div className="vote-container">
        <h2>Digite uma das opções no chat:</h2>
        <div className="vote-cards">
          {!quizActive && (
            <div className="vote-card open-quiz" onClick={openQuiz}>
              Abrir Quiz
            </div>
          )}
          {quizActive && (
            <>
              <div
                className="vote-card option-1"
                onClick={() => finishQuiz("1")}
              >
                Opção 1
                <br />
                {numberOfVotes.option1} votos
              </div>
              <div
                className="vote-card option-2"
                onClick={() => finishQuiz("2")}
              >
                Opção 2
                <br />
                {numberOfVotes.option2} votos
              </div>
            </>
          )}
        </div>
      </div>

      {quizActive && (
        <button
          onClick={cancelQuiz}
          style={{
            marginTop: "10px",
            backgroundColor: "#dc3545",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancelar Quiz
        </button>
      )}

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
