const Attendence = require("../../../model/attendance");

module.exports = async (req, res) => {
    try{
        const {studentId} = req.params
      const attendence = await Attendence.findOne({ studentId });
      if(!attendence){
        return res.status(404).json({success: false, message: "Attendence not found"})
      }
      return res.status(200).json({success: true, data: attendence, message: "Attendence fetched successfully"})
    }catch(err){
     return res.status(500).json({success: false, message: err.message});
    }
}