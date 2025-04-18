import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/chat/home"
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />
        <Route
          path="/chat/home/:name"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />

      {/* Conditional redirect based on auth status */}
      <Route
        path="*"
        element={<Navigate to={user ? "/chat/home" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
