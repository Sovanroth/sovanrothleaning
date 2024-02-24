import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ element, ...rest }) => {
//   const token = localStorage.getItem("token");

//   return token ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");

  return(
    token? <Outlet/> : <Navigate to="/login"/>
  );
};

export default PrivateRoute;
