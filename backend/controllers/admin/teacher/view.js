const Teacher = require('../../../model/teacher');

module.exports = async (req, res) => {
    try {
        const { teacherId } = req.params;

        // Query the teacher and populate the necessary fields
        const teacher = await Teacher.findById(teacherId)
            .populate('class')   // Populate the class (if a single class)
            .populate('classes') // Populate multiple classes (if applicable)
            .populate('subject'); // Populate the subject

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching teacher data',
            error: err.message
        });
    }
};
