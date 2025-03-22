const Studtent = require("../../model/student");

module.exports = async (req, res) => {
  try {
    let studentId = req.session.studentId;
    let student = await Studtent.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found!" });
    }
    res.status(200).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
