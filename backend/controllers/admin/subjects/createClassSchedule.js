const ClassSchedule = require('../../../model/classSchedule');

module.exports = async(req, res) => {
    try{
    const {classId, teacherId, subjectId} = req.body;

    if(!classId || !teacherId || !subjectId){
        return res.status(400).json({success: false, message:"required fields are empty😮‍💨"});
    }

    const fullyExists = await ClassSchedule.findOne({classId, teacherId, subjectId});
    if(fullyExists){
        return res.status(400).json({success: false, message: "Already Exists"});
    }
    const newClassSchedule = new ClassSchedule({
        classId,
        teacherId,
        subjectId
    });
    await newClassSchedule.save();
    return res.status(201).json({success: true, message: "class sheduled successfully😁"});
}catch(err){
    return res.status(500).json({success: false, message: "Internal error"})
}
}