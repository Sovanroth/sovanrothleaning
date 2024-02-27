import React from "react";
import ForgotPassword from "../../components/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-400">
      <ForgotPassword />
      <div className="flex-grow"></div>
      <footer></footer>
    </div>
  );
};

export default ForgotPasswordPage;
