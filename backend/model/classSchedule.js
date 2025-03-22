const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const classScheduleSchema = new Schema({
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class",
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required: true
    },
    subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required: true
    }
})
module.exports = model("ClassSchedule", classScheduleSchema);