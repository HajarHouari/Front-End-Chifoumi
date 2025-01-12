import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Tabs, Tab } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie"

axios.defaults.baseURL = "http://fauques.freeboxos.fr:3000";

function Login() {
  const [tabIndex, setTabIndex] = useState(0); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/login", { username, password });
      if (response.data.token) {
        Cookies.set("token", response.data.token, {expires : 7, secure : true} )
        localStorage.setItem("token", response.data.token); 
        navigate("/lobby");
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/register", { username, password });
      setTabIndex(0); 
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {tabIndex === 0 ? "Login" : "Register"}
        </Typography>
        <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <form onSubmit={tabIndex === 0 ? handleLogin : handleRegister}>
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
            {tabIndex === 0 ? "Login" : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;