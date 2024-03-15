import React from "react";
import Footer from "../../components/Footer";
import Login from "../../components/Login";

const LogInPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Login />
      <div className="flex-grow"></div>
      <footer>
      </footer>
    </div>
  );
};

export default LogInPage;
