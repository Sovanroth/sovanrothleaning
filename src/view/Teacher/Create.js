import React from "react";
import CreateCourse from "../../components/CreateCourse";
import TeacherNavBar from "../../components/TeacherNavBar";
import Footer from "../../components/Footer";
import AddCourse from "../../components/AddCourse";

const Create = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TeacherNavBar />
      <AddCourse />
    </div>
  );
};

export default Create;
