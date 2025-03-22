const Teacher = require('../../../model/teacher');
const Student = require('../../../model/student');
const Class = require('../../../model/class')

module.exports = async (req, res) => {
    try{
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalClasses = await Class.countDocuments();

        res.status(200).json({success: true, data:{totalTeachers, totalStudents, totalClasses}})
    }catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}