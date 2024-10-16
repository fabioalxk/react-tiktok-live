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
  const [currentTables, setCurrentTables] = useState(0); // Estado para controlar o grupo de tabelas
  const [isTransitioning, setIsTransitioning] = useState(false); // Estado para controlar a transição

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    newSocket.on("chat", (data) => {
      if (quizActive && data.comment) {
        let userResponse = data.comment?.trim();
        if (userResponse === "1" || userResponse === "2") {
          processUserResponse(data.uniqueId, userResponse);
        }
      }
    });

    return () => {
      newSocket.off("chat");
      newSocket.disconnect();
    };
  }, [quizActive]);

  useEffect(() => {
    // Alterna entre os grupos de tabelas a cada 10 segundos, com transição suave
    const interval = setInterval(() => {
      setIsTransitioning(true); // Inicia a transição
      setTimeout(() => {
        setCurrentTables((prev) => (prev + 1) % 2); // Alterna entre 0 e 1
        setIsTransitioning(false); // Termina a transição após 0.5s
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function processUserResponse(userId, userVote) {
    setUsersVotes((prevVoted) => {
      if (prevVoted.hasOwnProperty(userId)) return prevVoted;

      const updatedVotes = { ...prevVoted, [userId]: userVote };

      setUserScores((prevScores) => {
        const newScores = { ...prevScores };
        if (!newScores[userId]) {
          newScores[userId] = { userId: userId, score: 0 };
        }
        return newScores;
      });

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

      return updatedVotes;
    });
  }

  function openQuiz() {
    setQuizActive(true);
    setQuizCorrectAnswer(null);
    setNumberOfVotes({ option1: 0, option2: 0 });
    setUsersVotes({});
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
  }

  function updateRanking() {
    const rankingArray = Object.values(userScores)?.sort(
      (a, b) => b.score - a.score
    );
    setRanking(rankingArray);
  }

  const renderTable = (start, end) => {
    const tableData = ranking.slice(start, end);
    const placeholders = new Array(end - start - tableData.length).fill({
      userId: "-",
      score: "-",
    });

    return [...tableData, ...placeholders].map((user, index) => (
      <tr key={index}>
        <td>{start + index + 1}</td>
        <td>{user.userId}</td>
        <td>{user.score}</td>
      </tr>
    ));
  };

  return (
    <div className="home-container">
      <div className="vote-container">
        {quizActive ? (
          <>
            <div className="vote-cards">
              <div
                className="vote-card option-1 large-card"
                onClick={() => finishQuiz("1")}
              >
                Opção 1
                <br />
                <span>{numberOfVotes.option1} votos</span>{" "}
                {/* Número de votos maior */}
              </div>
              <div
                className="vote-card option-2 large-card"
                onClick={() => finishQuiz("2")}
              >
                Opção 2
                <br />
                <span>{numberOfVotes.option2} votos</span>{" "}
                {/* Número de votos maior */}
              </div>
            </div>
            <div className="cancel-button-container">
              <button className="cancel-button" onClick={cancelQuiz}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <div className="open-quiz minimized" onClick={openQuiz}>
            Abrir Quiz
          </div>
        )}
      </div>

      {!quizActive && (
        <div className="ranking-container">
          <h3 className="ranking-title">Ranking dos Participantes</h3>
          <div
            className={`tables-container ${isTransitioning ? "hidden" : ""}`}
          >
            {currentTables === 0 ? (
              <>
                <table className="ranking-table first-set">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuário</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable(0, 10)}</tbody>
                </table>
                <table className="ranking-table first-set">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuário</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable(10, 20)}</tbody>
                </table>
                <table className="ranking-table first-set">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuário</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable(20, 30)}</tbody>
                </table>
              </>
            ) : (
              <>
                <table className="ranking-table second-set">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuário</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable(30, 40)}</tbody>
                </table>
                <table className="ranking-table second-set">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuário</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable(40, 50)}</tbody>
                </table>
                <table className="ranking-table second-set">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuário</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable(50, 60)}</tbody>
                </table>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
