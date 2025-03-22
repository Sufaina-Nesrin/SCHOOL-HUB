import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import AddTeacher from "./pages/Teacher/AddTeacher/AddTeacher";
import Tprofile from "./pages/Teacher/Profile/Profile";
import AddClass from "./pages/class/AddClass/AddClass";
import AddStudent from "./pages/student/AddStudent/AddStudent";
import AddSub from "./pages/subject/AddSub/AddSub";
import ViewStudents from "./pages/student/ViewStudent/ViewStudents";
import Profile from "./pages/student/Profile/Profile";
import SubDis from "./pages/admin/subDis/SubDis";
import Edit from "./pages/student/EditProfile/Edit";
import View from "./pages/class/ViewAllClass/View";
import Vieww from "./pages/class/ViewClass/View";
import EditTeacher from "./pages/Teacher/EditProfile/EditProfile";
import ViewTeacher from "./pages/Teacher/ViewTeacher/ViewTeacher";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner/Spinner";
import AddMark from "./pages/Teacher/AddMark/AddMark";
import AddExam from "./pages/Teacher/AddExam/AddExam";
import AdminLayout from "./layouts/Admin/AdminLayout";
import TeacherLayout from "./layouts/Teacher/TeacherLayout";
import StudentLayout from "./layouts/Student/StudentLayout";
import NotFound from "./pages/NotFound/NotFound";
import ViewAllClassesById from "./pages/class/ViewClassesById/View";
import ViewOwnStd from "./pages/student/ViewOwnStudent/View";
import AllExam from "./pages/student/AllExam/AllExam";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { LoaderProvider } from "./utils/context/LoaderContext";
import StudentDashboard from "./components/Dashboard/studentDashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/teacherDashboard/TeacherDashboard";
import AdminDashboard from "./components/Dashboard/adminDashboard/AdminDashboard";
import Attendence from "./pages/student/Attendence/Attendence";

function App() {
  Chart.register(CategoryScale);
  return (
    <Router>
     <Spinner/>
      <AppContent />
      
    </Router>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(false); // stimulate delay of loading : testing  purpose
  const location = useLocation();

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [location]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default Route */}
        <Route path="/admin" element={
          <ProtectedRoute><AdminLayout/></ProtectedRoute>
          
          }>
        <Route index element={<AdminDashboard/>} />
          <Route path="teacher/add" element={<AddTeacher />} />
          <Route path="teacher/profile/:id" element={<Tprofile />} />
          <Route path="class/add" element={<AddClass />} />
          <Route path="student/add" element={<AddStudent />} />
          <Route path="subject/add" element={<AddSub />} />
          <Route path="student/view/:id" element={<ViewStudents />} />
          <Route path="student/profile/:id" element={<Profile />} />
          <Route path="subdis/:id" element={<SubDis />} />
          <Route path="class/view-all" element={<View />} />
          <Route path="class/view/:id" element={<Vieww />} />
          <Route path="teacher/view-all" element={<ViewTeacher />} />
          <Route path="student/mark/view-all" element={<AllExam/>} />
          <Route path="student/view-attendence" element={<Attendence/>} />
        </Route>

        <Route path="teacher" element={<ProtectedRoute><TeacherLayout/></ProtectedRoute>}>
        <Route index element={<TeacherDashboard/>}/>
          <Route path="edit-profile" element={<EditTeacher />} />
          <Route path="add-mark" element={<AddMark />} />
          <Route path="add-exam" element={<AddExam />} />
          <Route path="profile/:id" element={<Tprofile />} />
          <Route path="student/view/:id" element={<ViewStudents />} />
          <Route path="student/profile/:id" element={<Profile />} />
          <Route path="class/view-all/:id" element={<ViewAllClassesById/>} />
          <Route path="ownClass/:id" element={<ViewOwnStd/>}/>
          <Route path="class/view/:id" element={<Vieww />} />
          <Route path="student/mark/view-all" element={<AllExam/>} />
          <Route path="student/view-attendence" element={<Attendence/>} />
        </Route>

        <Route path="student" element={<ProtectedRoute><StudentLayout/></ProtectedRoute>}>
          <Route index element={<StudentDashboard/>}/>
          <Route path="edit-profile" element={<Edit />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="mark/view-all" element={<AllExam/>} />
          <Route path="view-attendence" element={<Attendence/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
