import React from "react";

function QuizControl({
  quizActive,
  openQuiz,
  cancelQuiz,
  toggleMute,
  toggleShowRank,
  isMuted,
}) {
  return (
    <div className="controls">
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
      {quizActive ? (
        <button onClick={cancelQuiz}>Cancelar</button>
      ) : (
        <button onClick={openQuiz}>Abrir Quiz</button>
      )}
      <button onClick={toggleShowRank}>Show Rank</button>
    </div>
  );
}

export default QuizControl;
