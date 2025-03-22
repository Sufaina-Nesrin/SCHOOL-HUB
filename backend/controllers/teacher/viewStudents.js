//here we're going to fetch the students in the particular class after
const Class = require('../../model/class');


module.exports = async(req, res)=>{
    try{

        let {classId} = req.params;
        let theClass = await Class.findOne({_id:classId}).populate('students');
        if(!theClass){
            return res.status(400).json({
                message: "Class not found",
            })
        }
        let students = theClass.students;
        if(students.length <= 0){
            return res.status(400).json({success: false, message: "No students found!"})
        }
        res.status(200).json({success: true, students});

    }catch(err){
       res.status(500).json({success: false, message: "Internal Error"})
    }
}