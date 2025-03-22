const Class = require('../../../model/class');
const StandardSubjects = require('../../../model/standardSubjects');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    let classId = req.params.classId;

    // Validate the classId
    if (!classId || !mongoose.isValidObjectId(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid class ID",
      });
    }

    // Find the class by ID
    let _class = await Class.findById(classId);
    if (!_class) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Find the standard subjects associated with the class
    let foundStandardSubjects = await StandardSubjects.findById(_class.standardSubjects).populate('subjects');
    if (!foundStandardSubjects) {
      return res.status(404).json({
        success: false,
        message: "Standard subjects not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: foundStandardSubjects.subjects, // Changed variable name for clarity
    });

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch standard subjects.",
      error: err.message,
    });
  }
};
