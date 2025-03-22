const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()


const connectDb = async()=>{
  const uri = 'mongodb://localhost:27017/schoolDb';
    try {
      const conn = await mongoose.connect(uri);
        console.log('database connected ')
      } catch (error) {
       console.log(error);
      }
}

module.exports = connectDb 