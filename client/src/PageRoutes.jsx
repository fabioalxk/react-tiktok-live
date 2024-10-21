import React from "react";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { history } from "./redux/store";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AudioStudio from "./pages/AudioStudio/AudioStudio";

const PageRoutes = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audios" element={<AudioStudio />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
