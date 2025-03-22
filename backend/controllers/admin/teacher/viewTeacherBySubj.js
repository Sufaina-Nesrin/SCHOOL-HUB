const Teacher = require('../../../model/teacher'); 

module.exports = async(req, res) => {
    try{
        const {subjectId} = req.params;
        if(!subjectId){
            return res.status(400).json({success: false, message: "Required field must not empty!"});
        }
        const teachers = await Teacher.find({subject: subjectId});
        if(teachers.length === 0){
            return res.status(404).json({success: false, message: "Teachers not found!"})
        }
        return res.status(200).json({success: true, message:"Teachers fetched successfully", data: teachers})
    }catch(err){
        return res.status(500).json({success: false, message:err.message})
    }
}