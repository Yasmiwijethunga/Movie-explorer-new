import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if user is logged in using token or context
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // You may replace with Context if used

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
