import React from 'react';
import { Pie } from "react-chartjs-2";

import { ViewAttendance } from '../../Actions/handlers/studentHandler';
import { useEffect } from 'react';
import { useState } from 'react';

function PieChart({attendenceData}) {
  const attendence = [attendenceData.totalPresent, attendenceData.totalAbsent]
    const chartData = {
      labels: ["Present", "Absent"],
      datasets: [
        {
          label: "Attendance Overview",
          data: attendence,
          backgroundColor: ["#36A2EB", "#FF6384"],
          borderColor: "black",
          borderWidth: 1
        },
      ],
    };
      const chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || "";
            if (context.parsed > 0) {
              label += ": " + context.parsed;
            }
            return label;
          },
        },
      },
    },
  };
    return (
        <div className="chart-container" >
          <Pie
            data={chartData}
            options={chartOptions1}
          />
        </div>
      );
}

export default PieChart;