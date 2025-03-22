const Subject = require("../../../model/subject");

module.exports = async (req, res) => {
    try{
      const allSubj = await Subject.find();
      if(allSubj.length != 0){
        return res.status(200).json({success: true, message: "subjects returned successfully", data:allSubj})
      }else{
        return res.status(401).json({success: false, message: "No subjects are available"})
      }
    }catch(err){
        return res.status(400).json({success: false, message: err.message})
    }
}