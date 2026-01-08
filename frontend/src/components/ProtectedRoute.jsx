import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar si hay token en localStorage
  const token = localStorage.getItem('token');
  
  // Si no hay token o el token no es válido, redirigir al login
  if (!token || token !== "user-authenticated") {
    return <Navigate to="/login" replace />;
  }
  
  // Si hay token válido, mostrar el componente protegido
  return children;
};

export default ProtectedRoute;
