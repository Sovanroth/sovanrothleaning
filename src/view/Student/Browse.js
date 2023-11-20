import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ExploreCourse from "../../components/ExploreCourse";
import { isEmpty } from "@firebase/util";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";

const Browse = () => {
  const [loading, setLoading] = useState(false);
  const course = useSelector((state) => state?.courses?.data);

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
