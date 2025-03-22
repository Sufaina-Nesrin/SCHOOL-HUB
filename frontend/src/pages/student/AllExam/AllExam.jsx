import React, { useState } from "react";
import "./AllExam.css";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../../utils/context/LoaderContext";
import { Predict } from "../../../Actions/handlers/authHandler";

function AllExam(props) {
  const location = useLocation();
  const [data, setData] = useState([]); // State to hold predicted data
  const [subjects, setSubjects] = useState([]); // State to hold subjects
  const allExams = location.state?.markData;
  const subCount = location.state?.subCount;
  const { showLoader, hideLoader } = useLoader();
console.log(subCount)
  const handlePredict = async (Exam1, Exam2) => {
    if (Exam1.length === Exam2.length && Exam1.length=== subCount ) {
      try {
        showLoader();
        const predictedData = await Predict({ Exam1, Exam2 });
        setData(predictedData); // Update state
        console.log("predict",predictedData )
        hideLoader();
      } catch (error) {
        console.error("Prediction error:", error);
        hideLoader();
      }
    } else {
      console.warn("Exam1 and Exam2 lengths do not match.");
    }
  };

  const Exam1 = [];
  const Exam2 = [];

  return (
    <div className="all-exam-outer-container">
      <h2 style={{ color: "#4b84b3", textAlign: "center", padding: "20px 0" }}>
        Exam - Marks
      </h2>
      <div className="all-exam-container">
        {allExams.map((examData, examIndex) => (
          <div className="exam-container" key={examIndex}>
            <div className="student-profile-academics">
              <h3>{examData.exam.name}</h3>
              <ul>
                {examData.marks
                  .slice()
                  .sort((a, b) => a.subject.name.localeCompare(b.subject.name))
                  .map((mark, index) => {
                    if (examIndex === 0) Exam2.push(mark.grade);
                    if (examIndex === 1) {
                      Exam1.push(mark.grade);
                      if (!subjects.includes(mark.subject.name)) {
                        setSubjects((prev) => [...prev, mark.subject.name]);
                      }
                    }
                    return (
                      <li className="subject-mark" key={mark._id || index}>
                        <span className="subject">{mark.subject.name}</span>
                        <div>
                          <span className="score" style={{ marginRight: "10px" }}>
                            {mark.score}
                          </span>
                          <span className="grade">{mark.grade}</span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ))}
      </div>
     <div className="predicted-marks-div">
        {allExams.length >= 2 && (
          <button id="btn-prdct" onClick={() => handlePredict(Exam1, Exam2)}>
            Predict-Next
          </button>
        )}
         {data.length !== 0 && (<ul>
          {subjects.map((sub, index) => (
            <li className="subject-mark" key={index}>
              <span className="subject">{sub}</span>
              <div>
                <span className="grade">
                  {data[index]?.PredictedGrades || "No prediction"}
                </span>
              </div>
            </li>
          ))}
        </ul>)}
      </div>
    </div>
  );
}

export default AllExam;
