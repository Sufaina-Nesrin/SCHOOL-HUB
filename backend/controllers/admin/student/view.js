const Student = require('../../../model/student');

module.exports = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId)
        .populate("class")
        .populate("attendence")

        if (student) {
            return res.status(200).json({
                success: true,
                data: student
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching student data',
            error: err.message
        });
    }
};
