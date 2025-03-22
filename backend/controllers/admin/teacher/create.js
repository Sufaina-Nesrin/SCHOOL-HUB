const Teacher = require("../../../model/teacher");
const generator = require('generate-password')

const bcrypt = require("bcrypt"); // Add bcrypt for password hashing

module.exports = async (req, res) => {
  try {
    let { name, phone, email, gender, subject } = req.body;

    // Validate input fields
    if (!name || !phone || !email || !gender || !subject) {
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
    
    // 'uEyMTw32v9'
    console.log(password)
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Teacher instance
    const teacher = new Teacher({
      name,
      phone,
      email, // Corrected variable name
      password: hashedPassword, // Store hashed password
      gender,
      subject,
    });

    // Save the teacher instance to the database
    await teacher.save(); // Call save() to persist the instance

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher,
      "password that doesnot hashed": password,
    });
  } catch (err) {
    // Handle any error that occurs during the process
    res.status(500).json({
      success: false,
      message: "Server error. Could not create teacher.",
      error: err.message,
    });
  }
};
