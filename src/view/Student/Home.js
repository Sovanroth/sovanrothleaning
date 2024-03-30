import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CourseOwned from "../../components/CourseOwned";
import { Helmet } from "react-helmet";

const Home = () => {
  // console.log(localStorage.getItem("userId"));
  // console.log(localStorage.getItem("token"));
  // console.log(localStorage.getItem("role"));
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>
          Suku | Home
        </title>
      </Helmet>
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
