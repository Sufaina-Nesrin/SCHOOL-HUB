const Exam = require('../../model/exam')
module.exports = async(req, res) => {
    try{
const classId = req.params.id;
const exams = await Exam.find({class: classId});
if(!exams || exams.length === 0){
    return res.status(400).json({success: false, message: "No exams found🥱"});

}
return res.status(200).json({success: true, message: "Exams fetched successfully😑", data: exams});
    }catch(err){
res.status(500).json({success: false, message:err.message})
    }
}