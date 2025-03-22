const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Usermodel = require('./user');

const adminSchema = new Schema({
    role:{
        type: String,
        default: 'admin'},
} ,{ _id : false });

module.exports = Usermodel.discriminator('Admin', adminSchema);