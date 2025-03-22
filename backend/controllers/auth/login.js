const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email",email);
    console.log("password",password);
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password!" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
      id: user._id, // Changed `userId` to `id`
      username: user.name, // Changed `name` to `username`
      role: user.role, // Added a role field
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    const decoded = jwt.decode(token);
    console.log("Decoded Token:", decoded);
    
    // Exclude sensitive fields and return user details
    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      role: user.role,
      userId: user._id,
      user: safeUser,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { login };
