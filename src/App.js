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
import Pricing from "./components/Pricing";
import PrivateRoute from "./view/Auth/PrivateRoute";
import TeacherPrivateRoute from "./view/Auth/TeacherPrivateRoute";
import NoTokenRoute from "./view/Auth/NoTokenRoute";
import ForgotPasswordPage from "./view/Auth/ForgotPasswordPage";
import SettingPage from "./view/SettingPage";
import WatchVideos from "./view/Student/WatchVideos";
import Example from "./test";
import SearchCourseModal from "./components/SearchCourseModal";
import SearchPage from "./view/Student/SearchPage";
import NotAllow from "./view/Teacher/NotAllow";
import { AuthProvider } from "./view/Auth/AuthContext";
import ResetPassword from "./view/Auth/ResetPassword";
import ResetPasswordSuccess from "./view/Auth/ResetPasswordSuccess";
import RequestLink from "./view/Auth/RequestLink";
import AddVideoPage from "./view/Teacher/AddVideoPage";
import Banner from "./components/Banner";

function App() {
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }

  document.onkeydown = (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
      e.key === 123 ||
      ctrlShiftKey(e, "I") ||
      ctrlShiftKey(e, "J") ||
      ctrlShiftKey(e, "C") ||
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
    )
      return false;
  };

  return (
    <AuthProvider>
      <Banner />
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/browse/buy-course/:id" element={<PurchaseCourse />} />
            <Route
              path="/browse/buy-course/pricing/:id"
              element={<Pricing />}
            />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/dashboard/course/:id" element={<WatchVideos />} />
            <Route path="/search-course/:id" element={<SearchPage />} />
          </Route>

          <Route element={<TeacherPrivateRoute />}>
            <Route path="/teacher-mode" element={<TeacherHome />} />
            <Route path="/teacher-mode/create" element={<Create />} />
            <Route
              path="/teacher-mode/edit-course/:id"
              element={<EditCoursePage />}
            />
            <Route path="/teacher-mode/create-course" element={<Create />} />
            <Route path="/delete-course" element={<DeleteCourseModal />} />
            <Route
              path="/teacher-mode/create-course/add-video/:id"
              element={<AddVideoPage />}
            />
          </Route>

          <Route element={<NoTokenRoute />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route
            path="forgot-password/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="forgot-password/reset-successfully"
            element={<ResetPasswordSuccess />}
          />
          <Route
            path="forgot-password/request-reset-password"
            element={<RequestLink />}
          />
          <Route path="loading" element={<LoadingScreen />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="test" element={<AddVideoPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
