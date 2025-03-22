const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = {
  verify: async function (req, res, next) {
    if (req.headers && req.headers.authorization) {
      try {
        const authHeader = req.headers.authorization;

        // Ensure proper format for Bearer token
        // if (!authHeader.startsWith("Bearer ")) {
        //   return res.status(400).json({ message: "Invalid authorization format!" });
        // }

        // Extract the token
        const receivedIdToken = authHeader.split(" ")[1];

        // Verify the token
        const decodedToken = jwt.verify(receivedIdToken, process.env.SECRET_KEY);

        if (decodedToken) {
          req.token = decodedToken; // Store the token payload in req.token   
          // Fetch the user by ID
          const user = await User.findById(decodedToken.id);
        

          if (!user) {
            return res.status(404).json({ message: "User not found!" });
          }

          req.user = user; // Attach the user object to the request
        }

        next(); // Proceed to the next middleware or route handler
      } catch (err) {
        console.error(err);

        // Handle specific JWT errors
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired!" });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Invalid token!" });
        }

        // Default error response
        return res.status(400).json({ message: "Failed to authenticate token!" });
      }
    } else {
      return res.status(400).json({ message: "Authorization header missing!" });
    }
  },
};
