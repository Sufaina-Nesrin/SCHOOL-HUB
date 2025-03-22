const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const standardSubjectsSchema = new Schema({
    std: { type: Number, required: true, unique: true },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Subject" , 
      },
    ],
  });
  module.exports = model("StandardSubjects", standardSubjectsSchema);
  