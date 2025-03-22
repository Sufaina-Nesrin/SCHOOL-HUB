const Subject = require("../../../model/subject");

module.exports = async (req, res) => {
    try{
        const {subjectId} = req.params;
        if(!subjectId){
            return res.status(400).json({success: false, message: "Id not found"})
        }
        const subject = await Subject.findById(subjectId);
        if(!subject){
            return res.status(404).json({success: false, message: "No subject Found", data: subject})
        }
        res.status(200).json({success: true, data: subject})
    }catch(err){
        return res.status(500).json({success: false, message: err.message})
    }
    
}