const Class = require('../../../model/class'); // Assuming you have a Class model

module.exports = async (req, res) => {
    try {
        // Query to get all classes
        const classes = await Class.find();

        // Return the classes as a response
        res.status(200).json({
            success: true,
            data: classes
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
