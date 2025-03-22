import { ViewAttendance } from "../../Actions/handlers/studentHandler";

export const attendanceData = [75, 3];
const attendenceRes = await ViewAttendance()
export const chartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance Overview",
        data: attendanceData,
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: "black",
        borderWidth: 2
      },
    ],
  };