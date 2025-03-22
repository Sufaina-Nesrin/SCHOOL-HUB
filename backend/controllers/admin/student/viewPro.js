const Student = require("../../../model/student");

module.exports = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (
      req.token.role !== "admin" &&
      req.token.role !== "teacher" &&
      req.token.id !== studentId
    ) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Admins only!" });
    }

    let student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    if (student.exams.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Marks are not defined",
      });
    }

    student = await Student.findById(studentId)
    .populate("class")
      .populate("attendence")
      .populate("exams.exam", "name mark")
      .populate("exams.marks.subject", "name");

    const latestExams = student.exams.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ); // [0] to get the first element

    return res.status(200).json({
      success: true,
      data: {student, latestExams},
      message: "Everything fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
