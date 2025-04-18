import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography, Grid, Box, Paper, Fade, CircularProgress } from "@mui/material";
import  fetchCharacters  from "../services/characterService"; 
import {startChatSession} from "../services/sessionService"; 

const CharacterGrid = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data); // Update the state with fetched characters
      } catch (err) {
        setError("Error fetching characters");
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, []); // Empty dependency array to run only on mount

  const handleClick = async (character) => {
  
    try {
      await startChatSession(character.id);
      navigate(`/chat/home/${character.name}`);
    } catch (error) {
      console.error("Failed to start chat session:", error);
      alert("Unable to start chat. Please log in again.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "red",
        }}
      >
        <Typography>{error}</Typography>
      </Box>
    );
  }

  const fullCharacters = [...characters];

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "#0d0d0d",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        py: 6,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {fullCharacters.map((char, index) => (
          <Fade in timeout={300 + index * 150} key={char.id}>
            <Grid item>
              <Paper
                onClick={() => handleClick(char)}
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  padding: 0,
                  textAlign: "center",
                  borderRadius: "14px",
                  width: { xs: 150, sm: 170, md: 190 },
                  height: { xs: 190, sm: 210, md: 230 },
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    transform: "scale(1.3)",
                  },
                }}
              >
                <Avatar
                  alt={char.name}
                  src={char.image}
                  sx={{
                    width: { xs: 80, sm: 90 },
                    height: { xs: 80, sm: 90 },
                    mb: 1.5,
                    border: "2px solid #2f2f2f",
                  }}
                >
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#eaeaea",
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                  }}
                >
                  {char.name}
                </Typography>
              </Paper>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Box>
  );
};

export default CharacterGrid;
