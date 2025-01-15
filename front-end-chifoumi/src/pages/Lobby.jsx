import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function Lobby() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchMatches = async () => {
      try {
        const response = await axios.get("/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
      } catch (err) {
        setError("Could not load matches.");
      }
    };

    fetchMatches();
  }, [navigate]);

  const handleCreateMatch = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/matches",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response = await axios.get("/matches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches(response.data);
    } catch (err) {
      setError("Could not create match.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography
          sx={{ fontFamily: "'Jersey 15'", textTransform: "uppercase" }}
          variant="h2"
          component="h1"
          gutterBottom
        >
          Lobby
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <List>
          {matches
            .filter((match) => !match.winner && match.turns.length <= 2).map((match) => (
              <ListItem key={match._id}>
                <ListItemText
                  sx={{
                    fontFamily: "Montserrat",
                    ".MuiListItemText-primary": {
                      color: "#e7e7e7",
                      fontSize: "14px",
                    },
                    ".MuiListItemText-secondary": {
                      color: "#006241",
                      fontSize: "16px",
                    },
                  }}
                  primary={`Match ID :`}
                  secondary={match._id}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/play/${match._id}`)}
                    sx={{
                      mt: 2,
                      fontFamily: "Montserrat",
                      padding: "4px 8px",
                      background: "#006241",
                      color: "#e7e7e7",
                      fontSize: "16px",
                      "&:hover": {
                        background: "#00754A"
                      },
                    }}
                  >
                    Join Game
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(`/watch/${match._id}`)}
                    sx={{
                      mt: 2,
                      fontFamily: "Montserrat",
                      padding: "4px 8px",
                      border: "1px solid #e7e7e7",
                      color: "#e7e7e7",
                      fontSize: "16px",
                      "&:hover": {
                        background: "#e7e7e7",
                        color: "#00754A",
                      },
                    }}
                  >
                    Watch Game
                  </Button>
                </Box>
              </ListItem>
            ))}
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "Montserrat",
              padding: "16px 16px",
              maxWidth: "250px",
              background: "#006241",
              borderRadius: "16px",
              color: "#e7e7e7",
              fontSize: "16px",
              "&:hover": {
                background: "#00754A",
              },
            }}
            onClick={handleCreateMatch}
          >
            Create New Match
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 15 }}>
        <Typography
          sx={{ fontFamily: "'Jersey 15'", textTransform: "uppercase" }}
          variant="h2"
        >
          GAME HISTORY
        </Typography>
        <List>
          {matches.filter((match) => match.winner).map((match) => (
            <ListItem
              key={match._id}
              sx={{
                "&:hover": {
                  background: "#006241",
                  color: "#00754A",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/watch/${match._id}`)}
            >
              <ListItemText
                primary={`Match ID: ${match._id}`}
                secondary={`Winner: ${match.winner.username}`}
                sx={{
                  ".MuiListItemText-primary": {
                    fontFamily: "Montserrat",
                    color: "#006241",
                    fontSize: "14px",
                  },
                  ".MuiListItemText-secondary": {
                    fontFamily: "Poppins",
                    color: "#e7e7e7",
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{
            fontFamily: "Montserrat",
            padding: "16px 16px",
            maxWidth: "250px",
            borderRadius: "16px",
            border: "1px solid #e7e7e7",
            color: "#e7e7e7",
            mt : 5,
            fontSize: "16px",
            "&:hover": {
              background: "#e7e7e7",
              color: "#00754A",
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

    </Container>
  );
}

export default Lobby;
