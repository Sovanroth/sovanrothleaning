import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/Student/Home";
import Browse from "./view/Student/Browse";
import Create from "./view/Teacher/Create";
import SignUpPage from "./view/Auth/SignUpPage";
import TeacherHome from "./view/Teacher/TeacherHome";
import NotFoundPage from "./components/NotFoundPage";
import LogInPage from "./view/Auth/LogInPage";
import EditCoursePage from "./view/Teacher/EditCoursePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/browse" element={<Browse/>}></Route>
          <Route path="/teacher-mode" element={<TeacherHome/>}></Route>
          <Route path="/teacher-mode/create" element={<Create/>}></Route>
          <Route path="/signup" element={<SignUpPage/>}></Route>
          <Route path="/login" element={<LogInPage/>}></Route>
          <Route path="/edit-course" element={<EditCoursePage/>}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
