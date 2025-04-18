import React, { useState, useContext } from "react";
import {
  Typography,
  IconButton,
  Box,
  CssBaseline,
  GlobalStyles,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import CharacterSidebar from "../components/CharacterSidebar";
import ChatWindow from "../components/ChatWindow";
import TopNavBar from "../components/TopNavBar"; 
import { useEffect } from "react";
import { getAllUserSessions } from "../services/sessionService";


const ChatPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sessions, setSessions] = useState([]);

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getAllUserSessions();
        setSessions(data);
        console.log("Loaded sessions:", data); // optional
      } catch (error) {
        console.error("Error fetching sessions", error);
      }
    };
  
    fetchSessions();
  }, []);

  const handleCharacterClick = (characterName) => {
    navigate(`/chat/home/${characterName}`);
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, html, #root": {
            margin: 0,
            padding: 0,
            height: "100%",
            backgroundColor: "#000",
            overflow: "hidden",
          },
          "*": {
            boxSizing: "border-box",
          },
          "*::-webkit-scrollbar": {
            width: "6px",
            background: "#111",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#333",
            borderRadius: "6px",
          },
        }}
      />

<TopNavBar user={user} />


      {/* Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "calc(100vh - 64px)",
          bgcolor: "#000",
          color: "#eee",
        }}
      >
        {/* Header toggle on mobile */}
        {isMobile && (
          <Box sx={{ p: 1, display: "flex", alignItems: "center", bgcolor: "#111" }}>
            <IconButton onClick={() => setSidebarOpen((prev) => !prev)} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ ml: 1 }}>Chat with {name}</Typography>
          </Box>
        )}

        <CharacterSidebar
          characters={sessions}
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
          onCharacterClick={handleCharacterClick}
        />

        {!isMobile && <Box sx={{ width: "1px", bgcolor: "#222" }} />}

        <ChatWindow
            name={name}
            characters={sessions}
        />
        </Box>
    </>
  );
};

export default ChatPage;
