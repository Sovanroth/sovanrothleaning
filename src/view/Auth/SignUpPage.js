import React from "react";
import SignUp from "../../components/SignUp";
import Footer from "../../components/Footer";

const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SignUp />
      <div className="flex-grow"></div>
      <footer></footer>
    </div>
  );
};

export default SignUpPage;
