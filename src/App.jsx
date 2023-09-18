import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { MusicProvider } from "./Components/MusicContext";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
// import LevelSatu from "./Pages/Level-1";
import NomerSatu from "./Components/Level 1/Nomer-1";
import NomerDua from "./Components/Level 1/Nomer-2";
import LevelDua from "./Pages/Level-2";
import LevelTiga from "./Pages/Level-3";

import "./index.css";

const App = () => {
  return (
    <Router>
      <MusicProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/level-1/nomer-1" element={<NomerSatu />} />
          <Route path="/level-1/nomer-2" element={<NomerDua />} />
          <Route path="/level-2" element={<LevelDua />} />
          <Route path="/level-3" element={<LevelTiga />} />
        </Routes>
      </MusicProvider>
      {/* <ButtonLevel Text="Level 1" */}
    </Router>
  );
};

export default App;
