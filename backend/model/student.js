const UserModel = require("./user");
const mongoose = require("mongoose"); // Ensure mongoose is imported
const { Schema, model } = mongoose;

const studentSchema = new Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true }, // Ensure Class reference is correct

  attendence:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Attendance',
  },
  role: { 
    type: String, 
    default: 'student' // Set default value to "student"
  },
  status: {
    type: String,
    default: "pass", // Default value
  },
  exams: [
    {
      exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
      marks: [
        {
          subject: {  type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
          score: { type: Number, required: true },
          grade: String,
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
});



module.exports = UserModel.discriminator("Student", studentSchema);
