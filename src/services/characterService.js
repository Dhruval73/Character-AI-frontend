import axios from "axios";
import apiConfig from "../config/apiConfig"; // Adjust the path as needed

const fetchCharacters = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const res = await axios.get(apiConfig.CHARACTERS.GET_ALL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // This returns the character data
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error; // You can handle this further where this function is called
  }
};

export default fetchCharacters;
