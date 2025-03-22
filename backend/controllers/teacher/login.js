const Teacher = require('../../model/teacher');
const bcrypt = require('bcrypt')

module.exports = async(req, res) => {
    try{
        const {email, password} = req.body;
        
const teacher = await Teacher.findOne({email: email});
if(!teacher){
    return res.status(404).json({success: false, message: "user not found"})
}
const matchPassword = bcrypt.compare(password, teacher.password);
if(!matchPassword){
    res.status(404).json({success: false, message: "Password didn't match"});
}
const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.SECRETKEY,
    { expiresIn: "6h" }
  );
  res.status(200).json({
    success: true,
    message: "Login Successfull",
    token: token,
  });
    }catch(err){
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    
    }
}