const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const examSchema = new Schema({
  name: { type: String },
  mark:Number,
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  
},{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // Enable timestamps
});

module.exports = model('Exam', examSchema);