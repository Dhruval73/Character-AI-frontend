import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { sendChatMessage, getChatMessages } from "../services/chatService";

const ChatWindow = ({
  name,
  characters,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const character = characters.find((c) => c.characterName === name);
  const messagesEndRef = useRef(null);
  const sessionId = character?.id;

  useEffect(() => {
    const loadMessages = async () => {
      if (!sessionId) return;

      try {
        const history = await getChatMessages(sessionId);
        setMessages(
          history.map((msg) => ({
            sender: msg.role === "user" ? "user" : name,
            text: msg.content,
            id: msg.id,
            timestamp: msg.timestamp,
          }))
        );
      } catch (err) {
        console.error("Error fetching chat history", err);
        setMessages([
          { sender: "system", text: "Failed to load previous messages." },
        ]);
      }
    };

    loadMessages();
  }, [sessionId]); // This will run when sessionId changes (i.e., on character change)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    console.log(sessionId);

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await sendChatMessage(sessionId, input);
      const botMsg = { sender: name, text: res.content || res.reply || "..." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = { sender: "system", text: "Failed to send message." };
      setMessages((prev) => [...prev, errMsg]);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          py: 1,
          px: 2,
          textAlign: "center",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={character?.image}
          sx={{ width: 40, height: 40, mb: 0.5 }}
        />
        <Typography
          variant="subtitle1"
          fontWeight={500}
          sx={{ fontSize: "0.95rem" }}
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#aaa", fontSize: "0.75rem" }}
        >
          Chat with {name}
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          pb: 7, // space for input box
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: "#1f1f1f",
                color: "#eee",
                borderRadius: 2,
                maxWidth: "75%",
                fontSize: 13,
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          p: 1.5,
          bgcolor: "#111",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <InputBase
          placeholder={`Message ${name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          fullWidth
          sx={{
            bgcolor: "#1f1f1f",
            px: 2,
            py: 1,
            borderRadius: "30px",
            fontSize: 13,
            color: "#eee",
            mr: 1.5,
          }}
        />
        <IconButton
          onClick={handleSendMessage}
          sx={{
            bgcolor: "#333",
            color: "#fff",
            "&:hover": { bgcolor: "#444" },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
