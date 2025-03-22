import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("id"); // Check for token or user auth

  if (!token) {
    return <Navigate to="/"  />; // Redirect to login page
  }

  return children; // Render children if authenticated
};

export default ProtectedRoute;
