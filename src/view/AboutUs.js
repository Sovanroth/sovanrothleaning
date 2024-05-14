import React from "react";
import NavBar from "../components/NavBar";
import About from "../components/About";
import FAQ from "../components/FAQ";

const AboutUs = () => {
  return (
    <div className=" w-full h-full">
      <NavBar />

      <About />
      {/* <FAQ /> */}
    </div>
  );
};

export default AboutUs;
