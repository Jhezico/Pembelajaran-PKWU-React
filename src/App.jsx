import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { MusicProvider } from "./Components/MusicContext";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
// import LevelSatu from "./Pages/Level-1";
import LevelSatu from "./Pages/Level-1";
import LevelDua from "./Pages/Level-2";
import LevelTiga from "./Pages/Level-3";
import NextToLevelTwo from "./Pages/NextToLevelTwo";
import NextToLevelThree from "./Pages/NextToLevelThree";
import EndGame from "./Pages/Congratulation";

import "./index.css";

const App = () => {
  return (
    <Router>
      <MusicProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/level-1" element={<LevelSatu />} />
          <Route path="/level-2" element={<LevelDua />} />
          <Route path="/level-3" element={<LevelTiga />} />
          <Route path="/next-to-level-2" element={<NextToLevelTwo />} />
          <Route path="/next-to-level-3" element={<NextToLevelThree />} />
          <Route path="/end-game" element={<EndGame />} />
        </Routes>
      </MusicProvider>
      {/* <ButtonLevel Text="Level 1" */}
    </Router>
  );
};

export default App;
