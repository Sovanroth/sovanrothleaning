import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./view/Student/Home";
import Browse from "./view/Student/Browse";
import Create from "./view/Teacher/Create";
import SignUpPage from "./view/Auth/SignUpPage";
import TeacherHome from "./view/Teacher/TeacherHome";
import NotFoundPage from "./components/NotFoundPage";
import LogInPage from "./view/Auth/LogInPage";
import EditCoursePage from "./view/Teacher/EditCoursePage";
import PurchaseCourse from "./view/Student/PurchaseCourse";
import LoadingScreen from "./components/LoadingScreen";
import DeleteCourseModal from "./components/DeleteCourseModal";
import BuyCourse from "./components/BuyCourse";
import Pricing from "./components/Pricing";
import PrivateRoute from "./view/Auth/PrivateRoute";

function App() {
  // const { token, setToken } = useToken();
  // if(!token) {
  //   return <LogInPage setToken={setToken} />
  // }

  // document.addEventListener("contextmenu", function (e) {
  //   e.preventDefault();
  // });

  // document.onkeydown = function (e) {
  //   if (e.keyCode === 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == "U".charCodeAt(0)) {
  //     return false;
  //   }
  // };

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/buy-course/:id" element={<PurchaseCourse />} />
          <Route path="/browse/buy-course/pricing" element={<Pricing />} />
        </Route>
        <Route path="/teacher-mode" element={<TeacherHome />} />
        <Route path="/teacher-mode/create" element={<Create />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route
          path="/teacher-mode/edit-course/:id"
          element={<EditCoursePage />}
        />
        <Route path="/teacher-mode/create-course" element={<Create />} />
        <Route path="loading" element={<LoadingScreen />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/delete-course" element={<DeleteCourseModal />} />
      </Routes>
    </Router>
  );
}

export default App;
