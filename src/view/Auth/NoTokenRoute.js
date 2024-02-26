import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const NoTokenRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default NoTokenRoute;
