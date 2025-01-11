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
      navigate("/login");
      return;
    }

    const fetchMatches = async () => {
      try {
        const response = await axios.get("/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data || []);
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
      setMatches(response.data || []);
    } catch (err) {
      setError("Could not create match.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          {matches.map((match) => (
            <ListItem
              key={match._id}
              button
              onClick={() => navigate(`/GameChoice/${match._id}`)} 
            >
              <ListItemText primary={`Match ID: ${match._id}`} />
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