const User = require('../../../model/user');
const Class = require('../../../model/class');

module.exports = async (req, res) => {
    try {
        if (req.token.role !== 'admin' && req.token.role !== 'teacher'){
            return res.status(403).json({ message: 'Access forbidden: Admins only!' });
        }
        const classId = req.params.id;

        // Find the class by ID and populate the students
        const theClass = await Class.findOne({ _id: classId }).populate('students');

        if (!theClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const students = theClass.students;

        // Send the list of students and the count
        return res.status(200).json({
           success: true, message: "students fetched successfully",
            data: students,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({success:false,message: 'Internal server error' });
    }
};
