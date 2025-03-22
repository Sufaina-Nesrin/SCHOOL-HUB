import React from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({examData}) => {
    
      const chartData = {
        labels: examData.marks.map((mark) => mark.subject.name), // Extract subject names
        datasets: [
          {
            label: "Marks",
            data: examData.marks.map((mark) => mark.score), // Extract scores
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      }; const maxScore = examData.exam.mark; // Maximum score from exam data

      return (
        <div className="chart-container" style={{ width: "100%", height: "400px" }}>
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Exam: ${examData.exam.name}`, // Optional title
                  font: {
                    size: 20, // Change title font size
                    weight: "bold",
                  },
                },
                
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true, // Start from zero
                  max: maxScore, // Set the maximum value
                  title: {
                    display: true,
                    text: "Marks",
                    font: {
                      size: 16, // Change y-axis title font size
                    },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Subjects",
                    font: {
                      size: 16, // Change y-axis title font size
                    },
                  },
                },
              },
            }}
          />
        </div>
      );
    };
    
    export default BarChart;