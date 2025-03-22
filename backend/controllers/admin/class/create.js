const Class = require("../../../model/class");
const StandardSubjects = require("../../../model/standardSubjects");
const Teacher = require('../../../model/teacher');
const Exam = require('../../../model/exam')

module.exports = async (req, res) => {
  try {

    let { std, section, classTeacher } = req.body;
    if (req.token.role !== 'admin'){
      return res.status(401).json({ message: 'Access forbidden: Admins only!' });
  }

    let standardSubjects = await StandardSubjects.findOne({ std: std });
    if (!standardSubjects) {
      return res
        .status(400)
        .json({ success: false, message: "not found such std subjects!" });
    }
   
const preDefExams = ['first-term', 'second-term', 'final-exam']

    const newClass = new Class({
      std,
      section,
      classTeacher,
      standardSubjects,
    });

    await newClass.save();

    let teacher = await Teacher.findById(classTeacher);
    if(!teacher){
        return res.status(400).json({
            message:"Teacher not found"
        })
    }
    if(teacher.hasCharge == true){
      return res.status(401).json({success: false, message: "Teacher is already assigned to another class"})
    }
    teacher.hasCharge = true;
    teacher.class = newClass._id;
    
    if (!teacher.classes.includes(newClass._id)) {
        teacher.classes.push(newClass._id);
      }

    await teacher.save();
    for (const exam of preDefExams) {
      const alreadyExists = await Exam.findOne({ class: newClass._id, name: exam });
      if (alreadyExists) {
        return res.status(400).json({ success: false, message: `Exam "${exam}" already exists for this class.` });
      }
      await new Exam({ name: exam, class: newClass._id, mark: 100 }).save();
    }
    
    res.status(201).json({
      success: true,
      message: "Class created successfully",
      newClass,
    });
  } catch (err) {
    
    res.status(500).json({
      success: false,
      message: "Server error. Could not create class.",
      error: err.message,
    });
  }
};



