const Attendance = require("../../model/attendance");
const Student = require("../../model/student");
const Teacher = require("../../model/teacher");
const Class = require("../../model/class");

module.exports = async (req, res) => {
  try {
    const { studentId, present } = req.body;
    console.log(studentId, present)
    const teacherId = req.token.id;

    // Check if the student exists and retrieve their class
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    // Verify if the teacher is authorized to mark attendance for this class
    const classData = await Class.findById(student.class._id).lean();
    if (classData.classTeacher.toString() !== teacherId) {
      return res.status(403).json({ success: false, message: "Access Denied" });
    }

    // Retrieve or create the attendance record
  
    let attendance = await Attendance.findOne({ studentId: studentId });
  if(!attendance){
    return res.status(401).json({ success: false, message: "Cannot add attendence"})
  }
    

    // Check if attendance is already marked for today
    const currentDate = new Date().setHours(0, 0, 0, 0); // Start of the day
    const alreadyMarked = attendance.records.some((record) => {
      const recordDate = new Date(record.date).setHours(0, 0, 0, 0);
      return recordDate === currentDate;
    });

    if (alreadyMarked) {
      return res.status(400).json({ success: false, message: "Attendance for today is already marked." });
    }

    // Add today's attendance record
    attendance.records.push({ date: new Date(), present });
    if (present) {
      attendance.totalPresent += 1;
    } else {
      attendance.totalAbsent += 1;
    }
    attendance.workingDays = attendance.totalPresent + attendance.totalAbsent;

    // Save the updated attendance
    await attendance.save();

    return res.status(200).json({ success: true, message: "Attendance marked successfully." });
  } catch (err) {
    console.error("Error marking attendance:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
