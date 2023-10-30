import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const Browse = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="App">
        Browse
      </div>
      <div className="flex-grow"></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Browse;
