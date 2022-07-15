import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import client from "../../lib/client";

const ProtectedRoute = ({ children }) => {
  return client.isLoggedIn() ? children : <Navigate replace to="/login" />;
};

export default ProtectedRoute;
