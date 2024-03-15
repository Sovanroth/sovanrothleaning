import React from "react";
import ForgotPassword from "../../components/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ForgotPassword />
      <div className="flex-grow"></div>
      <footer></footer>
    </div>
  );
};

export default ForgotPasswordPage;
