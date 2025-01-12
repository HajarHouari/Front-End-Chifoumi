import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import Watch from "./pages/Watch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/play/:matchId" element={<Play />} />
        <Route path="/watch/:matchId" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
