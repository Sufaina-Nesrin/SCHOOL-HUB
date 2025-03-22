const { Schema, model } = require("mongoose");

const subjectSchema = new Schema({
    name:String
})

module.exports = model("Subject", subjectSchema)