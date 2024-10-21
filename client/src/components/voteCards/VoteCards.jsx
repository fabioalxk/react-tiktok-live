import React from "react";

function VoteCards({ quizActive, finishQuiz, numberOfVotes }) {
  return (
    <div className="vote-container">
      {quizActive && (
        <div className="vote-cards">
          <div
            className="vote-card option-1 large-card"
            onClick={() => finishQuiz("1")}
          >
            Opção 1
            <br />
            <span>{numberOfVotes.option1} votos</span>
          </div>
          <div
            className="vote-card option-2 large-card"
            onClick={() => finishQuiz("2")}
          >
            Opção 2
            <br />
            <span>{numberOfVotes.option2} votos</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoteCards;
