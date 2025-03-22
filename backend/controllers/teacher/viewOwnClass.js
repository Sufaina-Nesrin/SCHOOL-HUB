const Class = require('../../model/class');

module.exports = async(req, res)=>{
    try{
        let teacherId = req.session.teacherId;
        let ownClass = Class.findOne({classTeacher:teacherId});
        if(!ownClass){
            return res.status(400).json({
                success: false,
                message: "not found"
            })
        }
        res.status(200).json({success: true, classDetails: ownClass})
           

    }catch(err){
        res.status(500).json({success:false, message:"Internal Error"})
    }
}