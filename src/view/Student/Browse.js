import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ExploreCourse from "../../components/ExploreCourse";
import { Helmet } from "react-helmet";
import Banner from "../../components/Banner";

const Browse = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Suku | Browse</title>
        </Helmet>
        <Banner/>
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
