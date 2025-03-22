import React from "react";
import { useLocation } from "react-router-dom";
import PieChart from "../../../components/Attendence/PieChart";
import Table from "../../../components/Table/Table";
import "./Attendence.css";

function Attendence(props) {
  const location = useLocation();
  const studentData = location.state?.studentData;
  {
    console.log(studentData);
  }
  return (
    <div className="attndnce-container">
      <div className="attndnce-inner-container">
        <div className="attndnce-container-first">
          <h2>Attendence summary</h2>
          <PieChart attendenceData={studentData.attendence} />
          <div>
            <span style={{fontWeight:'500'}}>present:{studentData.attendence.totalPresent}</span>
            <br />
            <span style={{fontWeight:'500'}}>absent:{studentData.attendence.totalAbsent}</span>
          </div>
        </div>

        <div className="attndnce-container-second">
          <Table attendence={studentData?.attendence?.records} />
        </div>
      </div>
    </div>
  );
}

export default Attendence;
