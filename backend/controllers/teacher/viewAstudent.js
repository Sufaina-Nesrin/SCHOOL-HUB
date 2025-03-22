const Student = require("../../model/student");

module.exports = async (req, res) => {
  try {
    let { studentId } = req.params;
    let student = await Student.findOne({ _id: studentId });
    if (!student) {
      return res.status(400).json({
        message: "student not found",
      });
    }
    res.status(200).json({
      success: true,
      student,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};
