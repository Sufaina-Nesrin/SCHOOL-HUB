import React from 'react';


function PredictExam(props) {
    return (
        <div className="predicted-marks-div">
          <ul>
        {subjects.map((sub, index) => (
          <li className="subject-mark" key={index}>
            <span className="subject">{sub.name}</span>
            <div>

              <span className="grade">{sub.grade}</span>
            </div>
          </li>
        ))}
      </ul>

        {allExams.length >= 2 && <button onClick={handlePredict}>PREDICT</button>}
        </div>
    );
}

export default PredictExam;