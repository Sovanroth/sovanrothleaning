import React from "react";
import CreateCourse from "../../components/CreateCourse";
import TeacherNavBar from "../../components/TeacherNavBar";
import Footer from "../../components/Footer";

const Create = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TeacherNavBar />
      <div className="flex-grow flex justify-center items-center">
        <CreateCourse />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Create;