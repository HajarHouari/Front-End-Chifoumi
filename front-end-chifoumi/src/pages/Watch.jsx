import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

function Watch() {
  const { matchId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
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
        setError("Could not load match data.");
      }
    };

    fetchGameState();
  }, [matchId]);

  const handleSubscribe = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const eventSource = new EventSource(
      `http://fauques.freeboxos.fr:3000/matches/${matchId}/subscribe/${token}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [...prev, data]);
    };

    eventSource.onerror = () => {
      setError("Connection lost. Please refresh to reconnect.");
      eventSource.close();
    };

    setSubscribed(true);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography
          sx={{ fontFamily: "Montserrat", textTransform: "uppercase" }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Watch Match
        </Typography>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {gameState ? (
          <Box>
            <Typography sx={{ fontFamily: "Poppins" }} variant="body1">
              Player 1: {gameState.user1.username} | Score:{" "}
              {gameState.user1.score}
            </Typography>
            <Typography sx={{ fontFamily: "Poppins" }} variant="body1">
              Player 2: {gameState.user2?.username || "Waiting"} | Score:{" "}
              {gameState.user2?.score || 0}
            </Typography>
            <Typography sx={{ fontFamily: "Poppins" }} variant="body1">
              Current Turn: {gameState.turns.length}
            </Typography>
            <List>
              {gameState.turns.map((turn, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Turn ${index + 1}:`}
                    secondary={`${turn.user1 || "Waiting"} vs ${
                      turn.user2 || "Waiting"
                    }`}
                    sx={{
                      ".MuiListItemText-primary": {
                        color: "#e7e7e7",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                      },
                      ".MuiListItemText-secondary": {
                        color: "#006241",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
            {gameState.winner ? (
              <Typography sx={{ fontFamily: "Poppins" }}>
                The winner is : {gameState.winner.username}
              </Typography>
            ) : null}
          </Box>
        ) : (
          <Typography>Loading match data...</Typography>
        )}
        {!subscribed ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              transition: "all 0.3s",
              mt: 2,
              maxWidth: "250px",
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
            onClick={handleSubscribe}
          >
            Subscribe to Match Notifications
          </Button>
        ) : (
          <Typography variant="body2" sx={{ fontFamily: "Montserrat" }}>
            Subscribed to match updates.
          </Typography>
        )}
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontFamily: "Montserrat" }} variant="h6">
            Notifications :{" "}
          </Typography>
          <List>
            {notifications.map((notif, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Type: ${notif.type}`}
                  secondary={`Payload: ${JSON.stringify(notif.payload)}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default Watch;
