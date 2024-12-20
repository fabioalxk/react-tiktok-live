import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AudioStudio from "./pages/AudioStudio/AudioStudio";
import Gifts from "./pages/Gifts/Gifts";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/audios" element={<AudioStudio />} />
      <Route path="/gifts" element={<Gifts />} />
    </Routes>
  );
};

export default PageRoutes;
