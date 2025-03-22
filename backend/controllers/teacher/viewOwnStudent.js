const Class = require('../../model/class');
module.exports = async(req, res)=>{
    try{
       const {id} = req.params;
        const teacherId = req.token.id;

        if(id !== teacherId){
            return res.status(400).json({success:false, message: "Access denied"});
        }
        
        let ownClass = await Class.findOne({classTeacher:teacherId}).populate('students');
        if(!ownClass){
            return res.status(400).json({message:"You are not a class teacher😁"})
        }
        let students = ownClass.students;
        
        
        res.status(200).json({success:true, data:students});


    }catch(err){
        res.status(500).json({success:false, message:"Internal Error!"})
            }
}