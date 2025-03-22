const Class = require("../../../model/class"); // Adjust path as needed
const Teacher = require("../../../model/teacher");

module.exports = async (req, res) => {
  try {
    if (req.token.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access forbidden: Admins only!" });
    }
    const { classId, subjectTeacherPairs } = req.body;
    console.log(classId, subjectTeacherPairs);
    // Validate input fields
    if (
      !classId ||
      !subjectTeacherPairs ||
      !Array.isArray(subjectTeacherPairs)
    ) {
      return res.status(400).json({
        success: false,
        message: "Class ID and subject-teacher pairs are required",
      });
    }

    // Find the class by ID
    const currClass = await Class.findById(classId);

    if (!currClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    //This set is remove that duplicate teachers
    const updatedTeachers = new Set();

    // Iterate through subject-teacher pairs and add them to subjectDistribution
    subjectTeacherPairs.forEach((pair) => {
      const { subjectId, teacherId } = pair;
      if (subjectId && teacherId) {

        const isAlreadyAssigned = currClass.subjectDistribution.some(
          (entry) => entry.subject.toString() === subjectId.toString()
        );
        let subjectDistribution = {}

        if (!isAlreadyAssigned) {
         subjectDistribution = {
            subject: subjectId,
            teacher: teacherId,
          };
        }
if(subjectDistribution){
        // Push the subject-teacher pair to the array
        currClass.subjectDistribution.push(subjectDistribution);
        updatedTeachers.add(teacherId);
      }
    }
    });

    // Save the updated class with the new subject distribution
    await currClass.save();

    const teacherUpdates = Array.from(updatedTeachers).map((teacher) => {
      return Teacher.findByIdAndUpdate(
        teacher,
        { $addToSet: { classes: classId } },
        { new: true }
      );
    });

    //concurrently save all the teacher documents
    await Promise.all(teacherUpdates);

    res.status(200).json({
      success: true,
      message: "Subject distribution added successfully",
      class: currClass,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the subject distribution",
      error: err.message,
    });
  }
};
