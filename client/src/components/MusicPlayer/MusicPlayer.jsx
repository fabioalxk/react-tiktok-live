import React, { useEffect, useRef, useState } from "react";

const MusicPlayer = ({ isQuizActive }) => {
  const audioRef = useRef(null);

  const defaultSongs = [
    "/assets/songs/default/cassino1.mp3",
    "/assets/songs/default/cassino2.mp3",
    "/assets/songs/default/cassino3.mp3",
    "/assets/songs/default/cassino4.mp3",
    "/assets/songs/default/cassino5.mp3",
  ];

  const quizSongs = [
    "/assets/songs/crucial/song1.mp3",
    "/assets/songs/crucial/song2.mp3",
    "/assets/songs/crucial/song3.mp3",
    "/assets/songs/crucial/song4.mp3",
  ];

  const [currentSongs, setCurrentSongs] = useState(defaultSongs);

  // Tocar música aleatória
  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * currentSongs.length);
    if (audioRef.current) {
      audioRef.current.src = currentSongs[randomIndex];
      audioRef.current.play();
    }
  };

  // Atualizar a lista de músicas ao alternar o estado do quiz
  useEffect(() => {
    if (isQuizActive) {
      setCurrentSongs(quizSongs);
    } else {
      setCurrentSongs(defaultSongs);
    }
  }, [isQuizActive]);

  // Tocar música ao montar ou quando a lista de músicas mudar
  useEffect(() => {
    playRandomSong();

    if (audioRef.current) {
      audioRef.current.onended = playRandomSong; // Tocar outra música quando a atual terminar
    }
  }, [currentSongs]);

  return <audio ref={audioRef} style={{ display: "none" }}></audio>;
};

export default MusicPlayer;
