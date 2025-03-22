const Student = require('../../model/student'); // Assuming correct paths for models
const Teacher = require('../../model/teacher');
const Subject = require('../../model/subject');;
const Exam = require("../../model/exam");
const calculateGrade = require('../../util/calculateGrade')

module.exports = async (req, res) => {
  try {
    const teacherId = req.token.id // Extracted from the session (logged-in teacher)
    const { studentId, classId, subjectId, score, examId} = req.body; // Extract student and subject from request params
  

    // Step 1: Find the teacher and ensure the teacher is assigned to the subject
    const teacher = await Teacher.findById(teacherId)
    if(teacher.subject.toString() !== subjectId){
      console.log("teacher.subject", teacher.subject);
      console.log("subjectId", subjectId)
      return res.status(401).json({success: false, message: "Access Denied😁"})
    }
    let student = await Student.findById(studentId);
    if(!student){
      return res.status(404).json({success: false, message: "Student not found.🥱"});
    }

    console.log("examId",examId);
    const exam = await Exam.findOne({_id:examId});
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found." });
    }

    

    const totalMarks = exam.mark; 
    if(score > totalMarks){
      return res.status(400).json({success: false, message: "Enter the marks up to "+totalMarks})
    }
    let grade = calculateGrade(score, totalMarks)
    
    const examIndex = student.exams.findIndex((exam) => exam.exam.toString() === examId);

    if (examIndex === -1) {
      student.exams.push({
        exam: examId,
        marks: [{ subject:subjectId, score, grade }],
      });
    } else {
      student.exams[examIndex].marks.push({ subject:subjectId, score, grade });
    }

    // Save the updated student document
    const updatedStudent = await student.save();

    // return updatedStudent;
    return res.status(200).json({success: true, message: "mark added successully😁"})
    

  } catch (error) {
    console.error("Error updating marks:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
