import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

function Play() {
  const { matchId } = useParams();
  const [gameState, setGameState] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

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
      await axios.post(`/matches/${matchId}/turns/${gameState.turns.filter((turn) => turn.winner).length + 1}`,
        { move: move },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response = await axios.get(`/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGameState(response.data);
      console.log(gameState);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6 }}>
        <Typography
          sx={{ fontFamily: "'Jersey 15'", textTransform: "uppercase" }}
          variant="h2"
        >
          PLAY MATCH
        </Typography>

        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
        {gameState ? (
          <Box>
            <Typography sx={{ fontFamily: "Poppins" }}>
              Player 1: {gameState.user1?.username} | Score:{" "}
              {
                gameState.turns?.filter((turn) => turn.winner === "user1").length
              }
            </Typography>

            <Typography sx={{ fontFamily: "Poppins" }}>
              Player 2: {gameState.user2?.username || "Waiting"} | Score:{" "}
              {
                gameState.turns?.filter((turn) => turn.winner === "user2").length
              }
            </Typography>

            <Typography sx={{ fontFamily: "Poppins" }}>
              {gameState.turns?.filter((turn) => turn.winner).length + 1 === 4
                ? "Match ended"
                : "Current Turn : " +
                  Number(
                    gameState.turns?.filter((turn) => turn.winner).length + 1
                  )}
            </Typography>

            {gameState.turns?.length >= 3 ? (
              gameState.winner ? (
                <Typography>
                  The winner is : {gameState.winner.username}
                </Typography>
              ) : (
                <Typography>It's a tie!</Typography>
              )
            ) : null}
            <Box
              sx={{ display: "flex", gap: "16px", justifyContent: "center" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handlePlayMove("rock")}
                sx={{
                  mt: 2,
                  maxWidth: "150px",
                  fontFamily: "Montserrat",
                  padding: "16px 16px",
                  background: "#006241",
                  color: "#e7e7e7",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#00754A"
                  },
                }}
              >
                Rock
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handlePlayMove("paper")}
                sx={{
                  mt: 2,
                  maxWidth: "150px",
                  fontFamily: "Montserrat",
                  padding: "16px 16px ",
                  background: "#006241",
                  color: "#e7e7e7",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#00754A"
                  },
                }}
              >
                Paper
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  maxWidth: "150px",
                  fontFamily: "Montserrat",
                  padding: "8px 16px",
                  background: "#006241",
                  color: "#e7e7e7",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#00754A"
                  },
                }}
                onClick={() => handlePlayMove("scissors")}
              >
                Scissors
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>Loading game state...</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Play;
