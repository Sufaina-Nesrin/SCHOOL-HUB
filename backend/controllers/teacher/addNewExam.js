const Exam = require('../../model/exam');
const Class = require('../../model/class');
const Student = require('../../model/student');

module.exports = async (req, res) => {
try{
const {classId, teacherId, name, mark} = req.body;

const teacherMatch =await Class.findOne({_id:classId, classTeacher: teacherId})
if(!teacherMatch && req.token.role !== 'admin'){
    return res.status(401).json({success: false, message:"Only class Teacher can create exams!"})
}
const alreadyExists = await Exam.findOne({class:classId, name:name});
if(alreadyExists){
  return res.status(400).json({success:false, message: "Try another name😮‍💨"})
}
const newExam = new Exam({
    name,
    mark,
    class: classId
});
await newExam.save();


res.status(201).json({success: true, message:"Exam created Successfully", data:newExam})
}catch(err) {

}
}