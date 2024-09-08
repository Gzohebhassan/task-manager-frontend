import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if token exists in localStorage (indicating user is logged in)
  
  if (!token) {
    return <Navigate to="/login" />;  // If no token, redirect to login
  }
  
  return children;  // Otherwise, render the children components (e.g., TaskBoardPage)
};

export default ProtectedRoute;
