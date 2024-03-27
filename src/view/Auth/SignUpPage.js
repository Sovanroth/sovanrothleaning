import React from "react";
import SignUp from "../../components/SignUp";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>
          Suku | Sign Up
        </title>
      </Helmet>
      <SignUp />
      <div className="flex-grow"></div>
      <footer></footer>
    </div>
  );
};

export default SignUpPage;
