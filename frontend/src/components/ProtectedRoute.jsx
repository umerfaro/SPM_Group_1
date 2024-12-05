// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can return a spinner or loading indicator here
    return <div>Loading...</div>;
  }

  if (!user) {
    // If not authenticated, redirect to login/signup
    return <Navigate to="/signup" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
