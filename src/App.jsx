import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import LevelSatu from "./Pages/Level-1";
import LevelDua from "./Pages/Level-2";
import LevelTiga from "./Pages/Level-3";

import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/level-1" element={<LevelSatu />} />
        <Route path="/level-2" element={<LevelDua />} />
        <Route path="/level-3" element={<LevelTiga />} />
      </Routes>

      {/* <ButtonLevel Text="Level 1" */}
    </Router>
  );
};

export default App;
