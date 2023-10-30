import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/Student/Home";
import Browse from "./view/Student/Browse";
import Courses from "./view/Teacher/Course";
import Create from "./view/Teacher/Create";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/browse" element={<Browse/>}></Route>
          <Route path="/teacher-mode" element={<Courses/>}></Route>
          <Route path="/teacher-mode/create" element={<Create/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
