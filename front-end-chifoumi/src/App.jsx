import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/" element={<Login />} />
        {/* Route pour la page du lobby */}
        <Route path="/lobby" element={<Lobby />} />
        {/* Route pour la page de jeu */}
        <Route path="/play/:matchId" element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
