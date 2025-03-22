const Class = require("../../../model/class");
const Attendance = require("../../../model/attendance");

module.exports = async (req, res) => {
  const classId = req.params.classId;

  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Get all students in the class
    const students = await Class.findById(classId).select("students"); // Assuming 'students' is an array of student IDs

    if (!students) {
      return res
        .status(401)
        .json({ success: false, message: "students not found" });
    }

    // Retrieve attendance records for those students on the current date
    const attendanceRecords = await Attendance.find({
      studentId: { $in: students.students }, // Filter by students in the class
      "records.date": { $gte: startOfDay, $lte: endOfDay }, // Filter records for today
    });

    let totalPresent = 0;
    let totalAbsent = 0;

    attendanceRecords.forEach((attendance) => {
      attendance.records.forEach((record) => {
        if (record.date >= startOfDay && record.date <= endOfDay) {
          if (record.present) totalPresent++;
          else totalAbsent++;
        }
      });
    });

    return res
      .status(200)
      .json({ success: true, data: { totalPresent, totalAbsent } });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ success: false, message: err.message });
  }
};
