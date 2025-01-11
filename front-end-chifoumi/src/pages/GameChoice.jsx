import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Box, Typography } from "@mui/material";

function GameChoice() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Match Options
        </Typography>
        <Typography variant="body1" gutterBottom>
          Match ID: {matchId}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/play/${matchId}`)}
        >
          Play Match
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/watch/${matchId}`)} 
        >
          Watch Match
        </Button>
      </Box>
    </Container>
  );
}

export default GameChoice;