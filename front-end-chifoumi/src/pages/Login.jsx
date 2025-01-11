import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

// Configurer axios avec l'URL de l'API
axios.defaults.baseURL = "http://fauques.freeboxos.fr:3000";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/login", { username, password });

      if (response.data.success) {
        navigate("/lobby");
      } else {
        setError(response.data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
