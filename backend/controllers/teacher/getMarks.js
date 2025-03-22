const mongoose = require('mongoose');
const Student = require('../../model/student');

function toObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
}

module.exports = async (req, res) => {
  try {
    const { classId, examId, subjectId, studentId } = req.query;

    // Validate input
    if (!classId || !examId || !subjectId || !studentId) {
      return res.status(400).json({
        success: false,
        message: "classId, examId, and subjectId are required.",
      });
    }
    

    const pipeline = [
      { $match: { _id: toObjectId(studentId), class: toObjectId(classId) } },
      { $unwind: "$exams" },
      { $match: { "exams.exam": toObjectId(examId) } },
      { $unwind: "$exams.marks" },
      { $match: { "exams.marks.subject": toObjectId(subjectId) } },
      { $project: { _id: 1, name: 1, score: "$exams.marks.score", sub:"$exams.marks.subject" } },
    ];

    console.log("Pipeline:", JSON.stringify(pipeline, null, 2));

    const marks = await Student.aggregate(pipeline);

    if (!marks || marks.length === 0) {
      return res.status(404).json({ success: false, message: "No marks found." });
    }

    return res.status(200).json({
      success: true,
      data: marks,
      message: "Marks fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching marks:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching marks.",
      error: error.message,
    });
  }
};
