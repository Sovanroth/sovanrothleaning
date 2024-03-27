import React from "react";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import { Helmet } from "react-helmet";

const LogInPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>
          Suku | Login
        </title>
      </Helmet>
      <Login />
      <div className="flex-grow"></div>
      <footer>
      </footer>
    </div>
  );
};

export default LogInPage;
