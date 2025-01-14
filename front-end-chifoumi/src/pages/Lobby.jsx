import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
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
        const response = await axios.get("/matches", {headers: { Authorization: `Bearer ${token}` },});
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
      await axios.post("/matches" , {} , { headers: { Authorization: `Bearer ${token}` } });
      const response = await axios.get("/matches", {headers: { Authorization: `Bearer ${token}` },});
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Lobby
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <List>
          {matches.filter((match) => !match.winner && match.turns.length <=2).map((match) => (
            <ListItem key={match._id}>
              <ListItemText primary={`Match ID: ${match._id}`} />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/play/${match._id}`)}
                >
                  Join Game
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(`/watch/${match._id}`)}
                >
                  Watch Game
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleCreateMatch}
        >
          Create New Match
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Lobby;
