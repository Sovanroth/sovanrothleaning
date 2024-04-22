import React from "react";
import ViewsCourse from "../../components/ViewsCourse";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const WatchVideos = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div>
          <ViewsCourse />
        </div>
        <div className="flex-grow"></div>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default WatchVideos;
