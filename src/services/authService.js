import apiConfig from "../config/apiConfig";

const authService = {
  signup: async ({ firstName, lastName, email, password }) => {
    const response = await fetch(apiConfig.AUTH.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Signup failed");
    }

    return await response.json(); // or just `return;` if nothing is returned
  },
  
  login: async (email, password) => {
    const res = await fetch(apiConfig.AUTH.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Login failed");
    }

    return await res.json();
  },
  };
  
  export default authService;
  