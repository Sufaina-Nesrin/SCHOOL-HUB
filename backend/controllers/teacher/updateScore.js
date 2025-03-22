const Student = require('../../model/student'); // Assuming correct paths for models
const Teacher = require('../../model/teacher');
const Subject = require('../../model/subject');
const Exam = require("../../model/exam");
const calculateGrade = require('../../util/calculateGrade');

module.exports = async (req, res) => {
  try {
    const teacherId = req.token.id; // Extracted from the session (logged-in teacher)
    const { studentId, subjectId, score, examId } = req.body;

    // Step 1: Find the teacher and ensure the teacher is assigned to the subject
    const teacher = await Teacher.findById(teacherId);
    if (teacher.subject.toString() !== subjectId) {
    //   console.log("teacher.subject", teacher.subject);
    //   console.log("subjectId", subjectId);
      return res.status(401).json({ success: false, message: "Access Denied😁" });
    }

    // Step 2: Find the student
    let student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found.🥱" });
    }

    // Step 3: Find the exam
    // console.log("examId", examId);
    const exam = await Exam.findOne({ _id: examId });
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found." });
    }

    const totalMarks = exam.mark; 
    if(score > totalMarks){
      return res.status(400).json({success: false, message: "Enter the marks up to "+totalMarks})
    }
    const grade = calculateGrade(score, totalMarks);

    // Step 4: Find the exam entry in the student's record
    const examIndex = student.exams.findIndex((exam) => exam.exam.toString() === examId);
    if (examIndex === -1) {
      return res.status(404).json({ success: false, message: "Exam not found in student's record." });
    }

    // Step 5: Locate the subject entry in the marks array for the specific exam
    const subjectIndex = student.exams[examIndex].marks.findIndex((mark) => mark.subject.toString() === subjectId);
    if (subjectIndex === -1) {
      return res.status(404).json({ success: false, message: "Subject not found in student's exam record." });
    }

    // Step 6: Update the score and grade
    student.exams[examIndex].marks[subjectIndex].score = score;
    student.exams[examIndex].marks[subjectIndex].grade = grade;

    // Step 7: Save the updated student document
    const updatedStudent = await student.save();

    // Step 8: Respond with success
    return res.status(200).json({ success: true, message: "Marks updated successfully😁", updatedStudent });
  } catch (error) {
    console.error("Error updating marks:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
