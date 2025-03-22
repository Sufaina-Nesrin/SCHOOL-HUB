const Teacher = require('../model/student');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        let id = req.params.id; // Retrieve the 'id' from route params
        const student = await Teacher.findById(id); // Find student by ID

        if (student) {
            let password = `${student.name}@123`; // Generate password
            console.log(password)
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            student.password = hashedPassword; // Update the password
            await student.save(); // Save changes to the database
            

            return res.status(200).json({ msg: "Password modified successfully" });
        }

        return res.status(404).json({ msg: "No student found" }); // Use 404 for not found
    } catch (err) {
        return res.status(500).json({ error: err.message }); // Log error message for clarity
    }
};
