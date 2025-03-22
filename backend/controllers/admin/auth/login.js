const Admin = require("../../../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return (res.status(400).json({message: "Required fields are not empty"}))
        }
        const adminUser = await Admin.findOne({email});
        if(!adminUser || adminUser == null || adminUser == undefined ){
            return res.status(400).json({
                success: false,
                message: "Admin not found!"
            })
        }
        const matchPassword = await bcrypt.compare(password, adminUser.password);
        if(matchPassword){
            const token = jwt.sign(
                {
                    admin:adminUser._id,
                    name:adminUser.name,
                },
                process.env.SECRET_KEY,
                {expiresIn: "1d"}
            );
            res.status(200).json({
                success:true,
                message: "Login successfull",
                token: token,
                
            })
        }else{
            res.status(400).json({
                success: false,
                message: "Password doesn't match"
            })
        }

    }catch(err){
        res.status(400).json({
            status: false,
            message: err.message
        })

    }
}