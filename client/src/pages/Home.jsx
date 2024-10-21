import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Home.scss";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import QuizControl from "../components/quizControl/QuizControl";
import VoteCards from "../components/voteCards/VoteCards";
import RankingTable from "../components/rankingTable/RankingTable";
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";
import GiftNotification from "../components/giftNotification/GiftNotification";
import TopGiftGivers from "../components/topGiftGivers/TopGiftGivers";

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
  const [currentTables, setCurrentTables] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [topGivers, setTopGivers] = useState([]);

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

    newSocket.on("gift", (data) => {
      console.log("data", data);
      setGifts((prevGifts) => [...prevGifts, data]);

      setTopGivers((prevGivers) => {
        const updatedGivers = { ...prevGivers };
        const currentGiver = updatedGivers[data.userId] || {
          username: data.username,
          giftCount: 0,
        };
        currentGiver.giftCount += data.giftCount;
        updatedGivers[data.userId] = currentGiver;

        return Object.values(updatedGivers)
          .sort((a, b) => b.giftCount - a.giftCount)
          .slice(0, 5);
      });
    });

    return () => {
      newSocket.off("chat");
      newSocket.disconnect();
    };
  }, [quizActive]);

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

  function toggleMute() {
    setIsMuted((prevMuted) => !prevMuted);
  }

  function toggleShowRank() {
    setShowRank((prevShowRank) => !prevShowRank);
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

  const handleNextTable = () => {
    if (currentTables < 1) setCurrentTables((prev) => prev + 1);
  };

  const handlePreviousTable = () => {
    if (currentTables > 0) setCurrentTables((prev) => prev - 1);
  };

  return (
    <div className="home-container">
      <div className="left-side">
        <MusicPlayer isQuizActive={quizActive} isMuted={isMuted} />
        <QuizControl
          quizActive={quizActive}
          openQuiz={openQuiz}
          cancelQuiz={cancelQuiz}
          toggleMute={toggleMute}
          toggleShowRank={toggleShowRank}
          isMuted={isMuted}
        />
        <VoteCards
          quizActive={quizActive}
          finishQuiz={finishQuiz}
          numberOfVotes={numberOfVotes}
        />
        {!quizActive && showRank && (
          <>
            <RankingTable
              ranking={ranking}
              currentTables={currentTables}
              renderTable={renderTable}
            />
            <NavigationButtons
              handlePreviousTable={handlePreviousTable}
              handleNextTable={handleNextTable}
              currentTables={currentTables}
            />
          </>
        )}
      </div>
      <div className="right-side">
        <GiftNotification gifts={gifts} />
        <TopGiftGivers topGivers={topGivers} />
      </div>
    </div>
  );
}

export default Home;
