const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const classSchema = new Schema({
  std: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Link to the Teacher model (class teacher)
    required: true,
  },
  standardSubjects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StandardSubjects",  // Reference to StandardSubjects
    required: true,
  },

  subjectDistribution :[
    {
      subject:{type: mongoose.Schema.Types.ObjectId, ref:'Subject'},
      teacher:{type:mongoose.Schema.Types.ObjectId, ref: 'Teacher'}
    }
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Link to the Student model
    },
  ],
});

// Export the Class model
module.exports = model("Class", classSchema);
