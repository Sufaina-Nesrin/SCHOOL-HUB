const Class = require('../../../model/class'); // Assuming you have a Class model

module.exports = async (req, res) => {
    try {
        const {classId} = req.params;
        // Query to get class
        const theClass = await Class.find({_id: classId});

        // Return the class as a response
        res.status(200).json({
            success: true,
            data:theClass
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: 'Error fetching class data',
            error: err.message
        });
    }
};
