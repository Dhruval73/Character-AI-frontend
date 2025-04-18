import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputBase,
  Button,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CharacterSidebar = ({ characters, sidebarOpen, isMobile, onCharacterClick }) => {
  const { name } = useParams();
  const navigate = useNavigate();

  
  const handleClick = () => {
      // Navigate to the character grid page
      navigate("/chat");  // Replace with your character grid route
    };

  if (!sidebarOpen) return null;

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "22%",
        flexShrink: 0,
        bgcolor: "#111",
        boxShadow: isMobile ? "none" : "2px 0 4px rgba(0, 0, 0, 0.4)",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 2, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#1a1a1a",
            px: 2,
            py: 1,
            borderRadius: "10px",
            mb: 2,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: "#888" }} />
          <InputBase placeholder="Search" fullWidth sx={{ color: "#eee", fontSize: 14 }} />
        </Box>
      </Box>

      <Box sx={{ px: 2, flexGrow: 1, overflowY: "auto" }}>
        <List>
          {characters.map((char) => (
            <ListItem
              key={char.id}
              button
              selected={char.characterName === name}
              onClick={() => onCharacterClick(char.characterName)}
              sx={{
                mb: 1,
                borderRadius: "10px",
                bgcolor: char.characterName === name ? "#1d1d1d" : "transparent",
                "&:hover": { bgcolor: "#222" },
                px: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar src={char.image} />
              </ListItemAvatar>
              <ListItemText
                primary={char.characterName}
                primaryTypographyProps={{
                  color: "#eee",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#333",
            color: "#eee",
            borderRadius: "12px",
            textTransform: "none",
            '&:hover': { bgcolor: "#444" },
          }}
          onClick={handleClick}
        >
          + Select Character
        </Button>
      </Box>
    </Box>
  );
};

export default CharacterSidebar;
