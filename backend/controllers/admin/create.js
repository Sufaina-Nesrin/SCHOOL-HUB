const Admin = require('../../model/admin');
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    try{
    //   if (req.token.role !== 'admin'){
    //     return res.status(403).json({ message: 'Access forbidden: Admins only!' });
    // }
       const { name, phone, email, gender, password} = req.body;
       if (!name || !phone || !email || !gender ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
       const newAdmin = new Admin({
        name,
        phone,
        email,
        gender,
        password: hashedPassword,
       })

       await newAdmin.save();
       res.status(201).json({message: "Admin created successfully",newAdmin})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}