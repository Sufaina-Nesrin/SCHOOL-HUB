const Teacher = require('../../model/teacher');
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
    try {
       

        // Get all profile data from the request body
     const {teacherId, name, currPassword, newPassword} = req.body
     console.log("teacherId:"+teacherId+"name"+name+", currPassword"+currPassword+"newPassword:"+newPassword);
     console.log("req.token.id:", req.token.id);
     if (teacherId !== req.token.id){
        return res.status(403).json({ message: 'Access forbidden' });
    }
    // console.log("name"+name+",currPassowrd:"+currPassword+", newPassword:"+newPassword+", studentId:"+studentId);
    if (!currPassword || !newPassword || !name || !teacherId) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
        // Find the teacher by ID
        let teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ success: false, message: "teacher not found" });
        }
        const matchPassword = await bcrypt.compare(currPassword, teacher.password);
        if(!matchPassword) {
            return res.status(400).json({ success: false, message: "Password didn't match"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        teacher.name = name;
        teacher.password = hashedPassword;
        const updatedteacher = await teacher.save();

        

        // Return success response
        return res.status(200).json({ success: true, message: "Profile updated successfully", teacher });

    } catch (err) {
        // Handle any server errors
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
