import React from "react";
import Courses from "../../components/Course";
import TeacherNavBar from "../../components/TeacherNavBar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const TeacherHome = () => {
  return (
    <div
      className="min-h-screen"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <Helmet>
          <title>Suku | Teacher Mode</title>
        </Helmet>
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
