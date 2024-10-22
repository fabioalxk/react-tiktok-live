import React, { useEffect, useRef, useState } from "react";

const MusicPlayer = ({ isQuizActive, isMuted }) => {
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
    "/assets/songs/crucial/showMilhao.mp3",
  ];

  const [currentSongs, setCurrentSongs] = useState(defaultSongs);

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * currentSongs.length);
    if (audioRef.current) {
      console.log("currentSongs[randomIndex]", currentSongs[randomIndex]);
      audioRef.current.src = currentSongs[randomIndex];
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (isQuizActive) {
      setCurrentSongs(quizSongs);
    } else {
      setCurrentSongs(defaultSongs);
    }
  }, [isQuizActive]);

  useEffect(() => {
    playRandomSong();

    if (audioRef.current) {
      audioRef.current.onended = playRandomSong;
    }
  }, [currentSongs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return <audio ref={audioRef} style={{ display: "none" }}></audio>;
};

export default MusicPlayer;
