import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CourseOwned from "../../components/CourseOwned";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div>
        <CourseOwned />
      </div>
      <div className="flex-grow"></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
