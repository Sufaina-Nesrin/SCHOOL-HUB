const Student = require("../../model/student");
const Attendence = require("../../model/attendance");

module.exports = async (req, res) => {
  try {
    const {studentId} = req.params;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student Not found" });
    }
    // con
    // let attendeceId = student.attendece;
    const attendece = await Attendence.findOne({studentId});
    if (!attendece) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: attendece });
  } catch (err) {}
};
