import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import GameChoice from "./pages/GameChoice"; 

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:matchId" element={<GameChoice />} />
        <Route path="/play/:matchId" element={<Play />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;