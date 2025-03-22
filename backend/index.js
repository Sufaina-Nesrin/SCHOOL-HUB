const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const userRoutes = require('./routes/user')
const testRoutes = require('./routes/test')
const connectDb = require('./config/db')
require("dotenv").config();

connectDb();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
      origin: 'http://localhost:5173',
      credentials: true, // Necessary if cookies or auth tokens are involved
  })
);

app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/user', userRoutes);
app.use('/test', testRoutes);

app.listen(3000, ()=>{
  console.log('backend server is running')
})
// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });
module.exports = app;