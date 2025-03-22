const StandardSubjects = require('../../../model/standardSubjects')

module.exports = async (req, res) => {
  try {
    // Extracting 'std' and 'subjects' from request body
    if (req.token.role !== 'admin'){
      return res.status(403).json({ message: 'Access forbidden: Admins only!' });
  }
    const { std, subjects } = req.body;
    console.log(std, subjects)

    // Check if standard and subjects are provided
    if (!std || !subjects || subjects.length === 0) {
      return res.status(400).json({ error: "Standard and subjects are required" });
    }
const hasStandardSub = await StandardSubjects.findOne({std});
if(hasStandardSub){
  return res.status(401).json({success: false, message: "This class has alreay a standard subject"})
}
    // Creating a new standard subject
    const newStandardSubjects = new StandardSubjects({
      std,
      subjects,
    });

    // Saving the document to the database
    await newStandardSubjects.save();

    // Return success response
    res.status(201).json({success: true, message: "Standard subjects created successfully", data: newStandardSubjects });
  } catch (err) {
    // Handle errors
    res.status(500).json({success: false, message:err.message, });
  }
};
