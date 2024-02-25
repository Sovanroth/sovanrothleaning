// TeacherPrivateRoute.js
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const TeacherPrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && parseInt(role) === 1) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default TeacherPrivateRoute;
