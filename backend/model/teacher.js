const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserModel = require("./user");

const teacherSchema = new Schema({
  class: {
   type:mongoose.Schema.Types.ObjectId,
   ref: 'Class'
  },
  role:{
    type: String,
    default: 'teacher'},
  subject: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subject',
    required: true,
  },
  hasCharge: {
    type: Boolean,
    default: false,
  },
  qualification: {
    type: String,
  },
  classes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class' 
    }
  ]
 
  

});

module.exports = UserModel.discriminator("Teacher", teacherSchema);
