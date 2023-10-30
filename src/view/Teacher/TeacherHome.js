import React from "react";
import Courses from "../../components/Course";
import TeacherNavBar from "../../components/TeacherNavBar";
import Footer from "../../components/Footer";

const TeacherHome = () => {
  return (
    <div
      className="min-h-screen"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <TeacherNavBar />
        <Courses />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default TeacherHome;
