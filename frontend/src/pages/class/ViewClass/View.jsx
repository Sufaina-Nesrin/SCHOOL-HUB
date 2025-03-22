import React, { useEffect, useState } from "react";
import "./View.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { GetATeacher, GetAttendence } from "../../../Actions/handlers/adminHandler";
import { useLoader } from "../../../utils/context/LoaderContext";

function View(props) {
  const [teacher, setTeacher] = useState("");
  const [matchSub, setMatchSub] = useState(null);
  const { id } = useParams();
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const location = useLocation();
  const classData = location.state?.classData;
  const studentCount = classData?.students.length || 0;
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
const [attndnceData, setAttndnceData] = useState({})
  useEffect(() => {
    const fetchTeacher = async () => {
      showLoader();
      let result = await GetATeacher(classData?.classTeacher);
      setTeacher(result);
      hideLoader();
    };

    if (classData?.subjectDistribution && role == "teacher") {
      const subject = classData.subjectDistribution.find(
        (dist) => dist.teacher === userId
      );
      setMatchSub(subject);
    }


const fetchAttndnce = async () => {
  let attndnce = await GetAttendence(classData._id);
  console.log("Attndnce",attndnce)
  setAttndnceData(attndnce);
  
}
fetchTeacher();
fetchAttndnce();

  }, [classData]);
  
  console.log("MATCH-SUB",matchSub)
  let url = "";
  if (role == "admin") {
    url += "/admin";
  } else if (role == "teacher") {
    url += "/teacher";
  }
  const handleClick = () => {
    navigate(`${url}/student/view/${id}`);
  };

  const handleAddMark = () => {
    navigate(`${url}/add-exam`, {
      state: { classData: classData, subjectData: matchSub },
    });
  };

  const handleAddSub = () => {
    navigate(`${url}/subject/add/`);
  };
  const handleAssignSub = () => {
    navigate(`${url}/subdis/${classData._id}`, { state: { classData } });
  };
  return (
    <div className="view-a-class-container">
      <div className="view-a-class-inner-container">
        <h2>
          CLASS {classData.std} {classData.section}
        </h2>
        <ul>
          <li>
            <span>Class :</span>
            <span>
              {classData.std} {classData.section}
            </span>
          </li>
          <li>
            <span>Class Teacher :</span>
            <span>{teacher?.name}</span>
          </li>
          <li>
            <span>Total no of Students :</span>
            <span>{studentCount}</span>
          </li>
          <li>
            <span>Present :</span>
            <span>{attndnceData.totalPresent ? attndnceData.totalPresent : "not recorded yet"}</span>
          </li>
          <li>
            <span>Absent :</span>
            <span>{attndnceData.totalAbsent ? attndnceData.totalAbsent : "not recorded yet"}</span>
          </li>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <li>
            {classData.students.length > 0 ? <button onClick={handleClick}>View Students</button>: <span>No students added yet</span>}
            </li>
            <li>
              {matchSub && <button onClick={handleAddMark}>Add Mark</button>}
              {/* {role === 'admin' &&classData.standardSubjects && <button onClick={handleAddSub}>Edit Subjects</button>}  */}
              {role === "admin" && (
                <button onClick={handleAssignSub}>Assign Subjects</button>
              )}
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default View;
