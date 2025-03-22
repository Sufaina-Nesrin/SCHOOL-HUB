const Student = require('../../../model/student'); // Assuming you have a Student model

module.exports = async (req, res) => {
    try {
        // if (req.token.role !== 'admin' && req.token.role !== 'teacher'){
        //     return res.status(403).json({ message: 'Access forbidden: Admins only!' });
        // }
        // Query to get all students
        const students = await Student.find();

        // Return students as a response
        res.status(200).json({
            success: true,
            data: students
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: 'Error fetching student data',
            error: err.message
        });
    }
};
