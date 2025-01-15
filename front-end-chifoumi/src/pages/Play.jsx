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
      await axios.post(
        `/matches/${matchId}/turns/${
          gameState.turns.filter((turn) => turn.winner).length + 1
        }`,
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
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontFamily: "Montserrat", textTransform: "uppercase" }}
          gutterBottom
        >
          Play Match
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {gameState ? (
          <Box>
            <Typography sx={{ fontFamily: "Poppins" }} variant="body1">
              Player 1: {gameState.user1?.username} | Score:{" "}
              {
                gameState.turns?.filter((turn) => turn.winner === "user1")
                  .length
              }
            </Typography>

            <Typography sx={{ fontFamily: "Poppins" }} variant="body1">
              Player 2: {gameState.user2?.username || "Waiting"} | Score:{" "}
              {
                gameState.turns?.filter((turn) => turn.winner === "user2")
                  .length
              }
            </Typography>

            <Typography sx={{ fontFamily: "Poppins" }} variant="body1">
              {gameState.turns?.filter((turn) => turn.winner).length + 1 === 4
                ? "Match ended"
                : "Current Turn " +
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
                  transition: "all 0.3s",
                  mt: 2,
                  maxWidth: "150px",
                  fontFamily: "Montserrat",
                  padding: "16px 16px !important",
                  background: "#006241",
                  color: "#e7e7e7",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#00754A",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
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
                  transition: "all 0.3s",
                  mt: 2,
                  maxWidth: "150px",
                  fontFamily: "Montserrat",
                  padding: "16px 16px !important",
                  background: "#006241",
                  color: "#e7e7e7",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#00754A",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
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
                  transition: "all 0.3s",
                  mt: 2,
                  maxWidth: "150px",
                  fontFamily: "Montserrat",
                  padding: "8px 16px !important",
                  background: "#006241",
                  color: "#e7e7e7",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#00754A",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
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
