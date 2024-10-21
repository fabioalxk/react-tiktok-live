import React, { useState, useEffect } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

const AudioStudio = () => {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setIsQuizActive((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

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
