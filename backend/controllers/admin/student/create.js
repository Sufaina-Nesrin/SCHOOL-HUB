const Student = require('../../../model/student');
const Attendence = require('../../../model/attendance')
const Class = require('../../../model/class');
const Exam = require('../../../model/exam')
const generator = require('generate-password');
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing


module.exports = async (req, res) => {
  try {
    if (req.token.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admins only!' });
    }
    let { name, phone, email, gender, standard, division } = req.body;
    console.log(req.body)
    // Validate input fields
    if (!name || !phone || !email || !gender || !standard || !division) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Creating random password
    var password = generator.generate({
      length: 10,
      numbers: true
    });
    
    
    console.log(password); // Debugging the generated password

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    const attendence = await new Attendence();
    const theClass = await Class.findOne({std: standard, section: division});
    if(!theClass){
      return res.status(400).json({success: false, message: "Class not found"})
    }
    // Create a new Student instance
    const student = new Student({
      name,
      phone,
      email,
      password: hashedPassword, // Store hashed password
      gender,
      class: theClass,
      attendence,
    });
    await student.save();

    // // Save the student instance to the database
    // await student.save();
    attendence.studentId = student._id;

    await attendence.save()
    // Adding student to the class array
    const currClass = await Class.findById(theClass);
    
    // Check if class exists
    if (!currClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    currClass.students.push(student._id); // Pushing student ID into class

    await currClass.save(); // Save the updated class

    // Send success response
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
      Orginalpassword:password
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the student",
      error: err.message,
    });
  }
};
