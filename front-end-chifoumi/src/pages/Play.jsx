import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

function Play() {
  const { matchId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchGameState = async () => {
      try {
        const response = await axios.get(`/matches/${matchId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGameState(response.data);
      } catch (err) {
        setError("Could not load game state.");
      }
    };

    fetchGameState();
  }, [matchId]);

  const handlePlayMove = async (move) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/matches/${matchId}/turns/${gameState.turns.length}`,
        { move:move },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGameState(response.data);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Play Match
        </Typography>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {gameState ? (
          <Box>
            <Typography variant="body1">
              Player 1: {gameState.user1.username} | Score: {gameState.user1.score}
            </Typography>
            <Typography variant="body1">
              Player 2: {gameState.user2?.username || "Waiting"} | Score: {gameState.user2?.score || 0}
            </Typography>
            <Typography variant="body1">
              Current Turn: {gameState.turns.length + 1}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handlePlayMove("rock")}
            >
              Play Rock
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handlePlayMove("paper")}
            >
              Play Paper
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handlePlayMove("scissors")}
            >
              Play Scissors
            </Button>
          </Box>
        ) : (
          <Typography>Loading game state...</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Play;