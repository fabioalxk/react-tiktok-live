import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Quiz.scss";
import questions from "./questions.json";

function Quiz() {
  const [quizActive, setQuizActive] = useState(false);
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(null);
  const [userScores, setUserScores] = useState({});
  const [ranking, setRanking] = useState([]);
  const [numberOfVotes, setNumberOfVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0,
  });
  const [usersVotes, setUsersVotes] = useState({});
  const [socket, setSocket] = useState(null);
  const [currentTables, setCurrentTables] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    newSocket.on("chat", (data) => {
      if (quizActive && !answerRevealed && data.comment) {
        let userResponse = data.comment?.trim();
        if (["1", "2", "3", "4"].includes(userResponse)) {
          processUserResponse(data.uniqueId, userResponse);
        }
      }
    });

    return () => {
      newSocket.off("chat");
      newSocket.disconnect();
    };
  }, [quizActive, answerRevealed]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsTransitioning(true);
  //     setTimeout(() => {
  //       setCurrentTables((prev) => (prev + 1) % 2);
  //       setIsTransitioning(false);
  //     }, 500);
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, []);

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

      setNumberOfVotes((prevVotes) => ({
        ...prevVotes,
        [`option${userVote}`]: prevVotes[`option${userVote}`] + 1,
      }));

      return updatedVotes;
    });
  }

  function openQuiz() {
    setQuizActive(true);
    setQuizCorrectAnswer(null);
    setNumberOfVotes({ option1: 0, option2: 0, option3: 0, option4: 0 });
    setUsersVotes({});
    setAnswerRevealed(false);
    // Avança para a próxima pergunta
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  }

  function revealAnswer() {
    setAnswerRevealed(true);
    // Obtém o número da opção correta (convertendo para "1", "2", etc.)
    const correctAnswer = (
      questions[currentQuestionIndex].options.findIndex(
        (option) => option === questions[currentQuestionIndex].correctAnswer
      ) + 1
    ).toString();
    finishQuiz(correctAnswer);
  }

  function finishQuiz(correctAnswer) {
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
    setNumberOfVotes({ option1: 0, option2: 0, option3: 0, option4: 0 });
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
        {quizActive && currentQuestionIndex >= 0 && questions.length > 0 ? (
          <>
            <div className="question-container">
              <h2>{questions[currentQuestionIndex].question}</h2>
            </div>
            <div className="vote-cards">
              {["1", "2", "3", "4"].map((optionNumber, index) => {
                const optionText =
                  questions[currentQuestionIndex].options[index];
                const isCorrect =
                  quizCorrectAnswer === optionNumber && answerRevealed;

                return (
                  <div
                    key={optionNumber}
                    className={`vote-card option-${optionNumber} large-card ${
                      isCorrect ? "highlight-correct" : ""
                    }`}
                  >
                    Opção {optionNumber} - {optionText}
                    <br />
                    <span>{numberOfVotes[`option${optionNumber}`]} votos</span>
                  </div>
                );
              })}
            </div>
            {!answerRevealed ? (
              <div className="reveal-button-container">
                <button className="reveal-button" onClick={revealAnswer}>
                  Revelar Resposta
                </button>
              </div>
            ) : (
              <div className="next-button-container">
                <button className="next-button" onClick={openQuiz}>
                  Próxima Pergunta
                </button>
              </div>
            )}
            <div className="cancel-button-container">
              <button className="cancel-button" onClick={cancelQuiz}>
                Voltar
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

export default Quiz;
