import React from "react";
import Setting from "../components/Setting";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const SettingPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div>
          <Setting />
        </div>
        <div className="flex-grow"></div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default SettingPage;
