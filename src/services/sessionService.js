import axios from "axios";
import apiConfig from "../config/apiConfig";

export const startChatSession = async (characterId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) throw new Error("No token found");

  const response = await axios.post(
    `${apiConfig.SESSION.START}`,
    null,
    {
      params: { characterId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // This can be the session object
};


export const getAllUserSessions = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) throw new Error("No token found");

  const response = await axios.get(
    `${apiConfig.SESSION.GET_ALL}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; 
};