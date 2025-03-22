import React, { useEffect, useState } from "react";
import "./Profile.css";
import PieChart from "../../../components/Attendence/PieChart";
import { useNavigate, useParams } from "react-router-dom";
import { ViewClass, ViewStudent } from "../../../Actions/handlers/adminHandler";
import { useLoader } from "../../../utils/context/LoaderContext";
import ViewMark from "../../../components/viewBox/ViewMark/ViewMark";

let url = "";
const role = localStorage.getItem("role");
if (role === "admin") {
  url += "/admin";
} else if (role === "teacher") {
  url += "/teacher";
}

function Profile(props) {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const userId = localStorage.getItem("id");
  const [classData, setClassData] = useState({});
  const [attendance, setAttendance] = useState({});
  const [mark, setMark] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchStudent = async () => {
      showLoader();
      if (role === "admin" || role === "teacher" || userId === id) {
        const studentData = await ViewStudent(id);

        if (studentData) {
          setStudent(studentData);
          setClassData(studentData.class || {}); // Ensure populated class data is set
          setAttendance(studentData.attendence || {}); // Ensure attendance is set
        }
      }
      hideLoader();
    };

    fetchStudent();
  }, [id]);
  console.log(student)
  console.log(attendance)

  const handleEdit = () => {
    navigate("/student/edit-profile");
  };

  const handleViewAllExam = () => {
    navigate(`${url}/student/mark/view-all`, { state: { markData: mark, subCount: count } });
  };

  function goToAttnd() {
    navigate(`${url}/student/view-attendence`, { state: { studentData: student } });
  }

  return (
    <div className="student-profile-main-container">
      <div className="student-profile-outer-container">
        <div className="student-profile-container">
          {/* Profile Image & Edit Button */}
          <div className="student-profile-img-section-card">
            <img src={student?.gender === "male" ? "/maleStud.png" : "/femaleStud.png"} alt="Student" />
            <div>
              <span className="text-transform">{student?.name}</span>
              {id === userId && <button onClick={handleEdit}>Edit</button>}
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="student-profile-personal-info">
            <h3 style={{ marginBottom: "10px" }}>Personal Info</h3>
            <span className="text-transform">{student.name}</span>
            <span>{student.email}</span>
            <span>{student.phone}</span>
            <span>{student.gender}</span>
            <span>******</span>
            <span>
              {classData?.std}-{classData?.section}
            </span>
          </div>

          {/* Attendance Section */}
          {/* {attendance && (
            <div>
              <h3>Attendance</h3>
              <p>Total Days Present: {attendance?.totalPresent || "N/A"}</p>
              <p>Total Days Absent: {attendance.totalAbsent}</p>
            </div>
          )} */}

          {/* Marks Section */}
          <ViewMark studentId={student._id} onMarksUpdate={setMark} onSubCount={setCount} />

          {/* Buttons for Viewing Exams & Attendance */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "1rem" }}>
            {mark.length > 0 && <button onClick={handleViewAllExam}>View All Exams</button>}
            <button className="goToAttnd" onClick={goToAttnd}>View Attendance</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
