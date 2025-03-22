import React, { useState } from "react";
import "./StudentDashboard.css";
import BarChart from "../../barChart/BarChart";
import { useUserContext } from "../../../utils/context/UserContext";

function StudentDashboard() {
  const { user } = useUserContext();
  const studentData = user?.student;
  const examData = user?.latestExams[0];

  const [showGraph, setShowGraph] = useState(false);

  const toggleGraph = () => {
    setShowGraph((prev) => !prev);
  };

  return (
    <>
    <div className="student-dashboard-main-container">
 {showGraph== false? (<div className="student-dashbord-name-container"><h2 className="welcome-message">Welcome, {studentData?.name || "Student"}!</h2>
      
      <button className="blue-button" onClick={toggleGraph}>
        {showGraph ? "Hide Graph" : "Show Graph"}
      </button></div>):(
        <div className="mark-summary">
          <h3 style={{ textAlign: "center" }}>Mark-Summary</h3>
          <BarChart examData={examData} />
          <button className="blue-button" onClick={toggleGraph}>
        {showGraph ? "Hide Graph" : "Show Graph"}
      </button>
        </div>
        
      )}
    </div>
   

    {/* <div className="student-dashboard-main-container">
     
      {showGraph && }
    </div> */}
    </>
    
  );
}

export default StudentDashboard;
