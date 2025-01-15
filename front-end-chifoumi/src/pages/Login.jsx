import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

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
        Cookies.set("token", response.data.token, { expires: 7, secure: true });
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "0",
      }}
    >
      <Box sx={{ mt: 8 }}>
        <Typography
          sx={{ fontFamily: "Montserrat", textTransform: "uppercase" }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          {tabIndex === 0 ? "Login" : "Register"}
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          sx={{
            "& .MuiTabs-indicator": {
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#00754A",
            },
          }}
        >
          <Tab
            sx={{
              fontFamily: "Montserrat",
              color: "#006241",
              "&.Mui-selected": { color: "#00754A" },
            }}
            label="Login"
          />
          <Tab
            sx={{
              fontFamily: "Montserrat",
              color: "#006241",
              "&.Mui-selected": { color: "#00754A" },
            }}
            label="Register"
          />
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
            color="primary"
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
            color="primary"
            sx={{
              transition: "all 0.3s",
              mt: 2,
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
            {tabIndex === 0 ? "Login" : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
