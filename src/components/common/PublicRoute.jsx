import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />; //eğer kullanıcı giriş yapmışsa anasayfaya yönlendirilir
  }
  return children;
};

export default PublicRoute;
