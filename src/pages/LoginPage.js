import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  GlobalStyles,
  Paper,
  Link,
  useMediaQuery,
  useTheme,
  Alert, // ✅ Add this
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState("");

  const handleAuth = async () => {
    console.log("Auth button clicked");
    setError("");
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      let user;
  
      if (isSignUp) {
        user = await authService.signup(email, password);
        user.firstLogin = true; // for new users
      } else {
        const result = await authService.login(email, password);
  
        // Build user object based on backend response
        user = {
          token: result.token,
          firstLogin: Number(result.loginCount),
        };
      }
  
      localStorage.setItem("user", JSON.stringify(user));
      login(user);
      console.log(user.firstLogin);
      navigate(user.firstLogin === 1 ? "/chat" : "/chat/home");
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { margin: 0, padding: 0, backgroundColor: "#000" },
        }}
      />

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#eee",
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 3,
            bgcolor: "#111",
            width: "100%",
            maxWidth: 340,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: "#eee",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            TalkToYourLegends
          </Typography>

          <Typography sx={{ mb: 2, color: "#aaa", fontSize: "0.9rem" }}>
            {isSignUp
              ? "Create your account to begin the conversation."
              : "Log in to start chatting with legends."}
          </Typography>

          {/* ✅ Error Alert */}
          {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  bgcolor: "#220000",      // dark red background
                  color: "#ffaaaa",         // softer red text
                  border: "1px solid #440000",
                  ".MuiAlert-icon": { color: "#ff8888" },
                }}
              >
                {error}
              </Alert>
            )}

          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: "#eee" },
              label: { color: "#ccc" },
              mb: 2,
              bgcolor: "#1a1a1a",
              borderRadius: "6px",
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: "#eee" },
              label: { color: "#ccc" },
              mb: 2,
              bgcolor: "#1a1a1a",
              borderRadius: "6px",
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleAuth}
            sx={{
              mt: 2,
              bgcolor: "#333",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#444",
              },
            }}
          >
            {isSignUp ? "Create Account" : "Login"}
          </Button>

          <Typography variant="body2" sx={{ mt: 3, color: "#aaa" }}>
            {isSignUp ? "Already have an account?" : "New here?"}{" "}
            <Link
              component="button"
              onClick={() => navigate("/signup")}
              sx={{ color: "#4dabf7", ml: 1 }}
            >
              Create an account
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
