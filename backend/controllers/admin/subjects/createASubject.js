const Subject = require("../../../model/subject");

module.exports = async (req, res) => {
  try {
    if (req.token.role !== 'admin'){
      return res.status(403).json({ message: 'Access forbidden: Admins only!' });
  }
    let { subject } = req.body;

    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    subject = subject.toLowerCase();
const alreadyExist =await Subject.findOne({name:subject});
if(alreadyExist){
  return( res.status(409).json({
    message:"already exist"
  }))
}
    const newSub = new Subject({
      name: subject,
    });

    await newSub.save();

    res
      .status(201)
      .json({ message: "Subject created successfully", subject: newSub });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create subject", details: err.message });
  }
};
