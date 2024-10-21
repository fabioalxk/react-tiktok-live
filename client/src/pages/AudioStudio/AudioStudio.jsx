import React, { useState, useEffect } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer"; // Importa o MusicPlayer

const AudioStudio = () => {
  const [isQuizActive, setIsQuizActive] = useState(false); // Controla se estamos nas "quizSongs"
  const [isMuted, setIsMuted] = useState(false); // Para controle do mute, se quiser implementar isso

  // Captura a tecla Enter e alterna entre as músicas
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setIsQuizActive((prev) => !prev); // Alterna o estado
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h1>Pressione Enter para alternar entre músicas!</h1>
      <MusicPlayer isQuizActive={isQuizActive} isMuted={isMuted} />
    </div>
  );
};

export default AudioStudio;
