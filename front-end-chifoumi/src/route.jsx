import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
const LoginPage = () => <div>Page de connexion</div>;
const LobbyPage = () => <div>Page du lobby</div>;
const MatchPage = () => <div>Page d'une partie</div>;

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
      </Routes>
    </Router>
  );
}