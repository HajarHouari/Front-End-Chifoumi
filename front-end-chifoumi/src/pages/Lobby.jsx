import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Configurer axios avec l'URL de l'API
axios.defaults.baseURL = "http://fauques.freeboxos.fr:3000/";

function Lobby() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("/matches");
        setMatches(response.data || []);
      } catch (err) {
        setError("Could not load matches.");
      }
    };

    fetchMatches();
  }, []);

  const handleCreateMatch = async () => {
    try {
      const response = await axios.post("/matches");
      navigate(`/play/${response.data.matchId}`);
    } catch (err) {
      setError("Could not create match.");
    }
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
              key={match.id}
              button
              onClick={() => navigate(`/play/${match.id}`)}
            >
              <ListItemText primary={`Match ID: ${match.id}`} />
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
      </Box>
    </Container>
  );
}

export default Lobby;