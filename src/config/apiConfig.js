// src/config/apiConfig.js
const API_BASE_URL = "http://localhost:8080/api";

export default {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
  },
  CHARACTERS: {
    GET_ALL: `${API_BASE_URL}/characters`, // Fetch all characters
    GET_BY_ID: (id) => `${API_BASE_URL}/characters/${id}`, // Get character by ID
  },
  SESSION: {
    START: `${API_BASE_URL}/chat/start`,
    GET_ALL: `${API_BASE_URL}/chat/my-sessions`
  },
  MESSAGES:  {
    GET_ALL: (sessionId) => `${API_BASE_URL}/chat/${sessionId}/messages`,
    SEND: (sessionId) => `${API_BASE_URL}/chat/${sessionId}/message`, 
  }
};
