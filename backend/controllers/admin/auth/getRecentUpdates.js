const User = require('../../../model/user')

module.exports = async(req, res) => {
    try{
        const recentUsers = await User.find()
        .sort({ createdAt: -1 }) // Sort by latest created
        .limit(5) // Limit to 5 users
        .select('name role') // Retrieve only name and role
        .lean(); // Use lean for better performance
        if(recentUsers.length <= 0){
            return res.status(400).json({success: false, message: "No users found"})
        }

    res.status(200).json({success: true, data: recentUsers})

    }catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}