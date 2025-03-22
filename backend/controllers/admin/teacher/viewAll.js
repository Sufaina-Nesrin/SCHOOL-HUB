const Teacher = require('../../../model/teacher'); 

module.exports = async (req, res) => {
    try {
        // Query to get all teachers
        const teachers = await Teacher.find();

        // Return teachers as a response
        res.status(200).json({
            success: true,
            data: teachers
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: 'Error fetching teacher data',
            error: err.message
        });
    }
};
