import React from 'react';
import PieChart from './PieChart';

function AttContainer({attendence}) {
    return (
        <div className="attendence-container">
      <div className="attendence-summary">
          <h3 style={{ textAlign: "center" }}>Attendence-Summary</h3>
          
          
  <PieChart attendenceData={attendence} />


        </div> 
        </div>
    );
}

export default AttContainer;