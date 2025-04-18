import API from "../config/apiConfig";

export const sendChatMessage = async (sessionId, message) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const response = await fetch(API.MESSAGES.SEND(sessionId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return await response.json(); // Should return Message object
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getChatMessages = async (sessionId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const res = await fetch(API.MESSAGES.GET_ALL(sessionId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // if you're using JWT
    },
  });

  if (!res.ok) throw new Error("Failed to fetch messages");
  return await res.json();
};