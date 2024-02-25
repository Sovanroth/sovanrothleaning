import React from "react";
import SignUp from "../../components/SignUp";
import Footer from "../../components/Footer";

const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-400">
      <SignUp />
      <div className="flex-grow"></div>
      <footer></footer>
    </div>
  );
};

export default SignUpPage;
