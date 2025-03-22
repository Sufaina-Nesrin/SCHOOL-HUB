const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
  studentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Student', 
  },
  records: [{
    date: { 
      type: Date, 
      
    },
    present: { 
      type: Boolean, 
      
    }
  }],
  totalPresent:{
    type:Number,
    default:0,
  }, 
  totalAbsent: {
    type:Number,
    default:0,
  },
  workingDays:{
    type:Number,
    default:0,
  } 
});

// Pre-save hook to calculate totalPresent and totalAbsent
attendanceSchema.pre('save', function(next) {
  const attendance = this;

  // Count total present and absent
  const totalPresent = attendance.records.filter(record => record.present).length;
  const totalAbsent = attendance.records.filter(record => !record.present).length;

  // Set the values
  attendance.totalPresent = totalPresent;
  attendance.totalAbsent = totalAbsent;
  attendance.workingDays = totalAbsent + totalPresent;

  next();
});

module.exports = model("Attendance", attendanceSchema);


