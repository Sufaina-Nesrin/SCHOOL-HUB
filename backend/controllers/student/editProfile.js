const Student = require('../../model/student');
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
    
        // Get all profile data from the request body
        const {currPassword, newPassword, name, studentId} = req.body;
        if (studentId !== req.token.id){
            return res.status(403).json({ message: 'Access forbidden' });
        }
        // console.log("name"+name+",currPassowrd:"+currPassword+", newPassword:"+newPassword+", studentId:"+studentId);
        if (!currPassword || !newPassword || !name || !studentId) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find the student by ID
        let student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        const matchPassword = await bcrypt.compare(currPassword, student.password);
        if(!matchPassword) {
            return res.status(400).json({ success: false, message: "Password didn't match"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.name = name;
        student.password = hashedPassword;
        const updatedStudent = await student.save();

        // Return success response
        return res.status(200).json({ success: true, message: "Profile updated successfully", updatedStudent });

    } catch (err) {
        // Handle any server errors
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
