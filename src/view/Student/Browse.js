import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ExploreCourse from "../../components/ExploreCourse";

const Browse = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div>
          <ExploreCourse />
        </div>
        <div className="flex-grow"></div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Browse;
