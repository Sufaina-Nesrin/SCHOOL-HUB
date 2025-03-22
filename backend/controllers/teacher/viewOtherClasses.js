const Teacher = require('../../model/teacher')
module.exports = async(req, res)=>{
    try{
        let teacherId = req.params.id;
        console.log("teacherId",teacherId)
        console.log("token", req.token.id)
        // if(teacherId != req.token.id){
        //     console.log(teacherId, req.token.id)
        //     return res.status(400).json({success: false, message: "Access Denied"})
        // }
        let getClasses = await Teacher.findOne({_id: teacherId}).populate('classes');
        if(!getClasses){
            return res.status(400).json({
                success:false,
                message:"didn't get"
            })
        }
        let allClass = getClasses.classes;
        res.status(200).json({
            success: true,
            data:allClass
        })
  
    }catch(err){
res.status(500).json({success:false, message: err.message})
    }
}