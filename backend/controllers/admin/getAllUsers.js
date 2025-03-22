const User = require('../../model/user');

module.exports = async (req, res) => {
try{
  const allUsers = await User.find();
  if(!allUsers.length){
    return res.status(404).json({message: "No users found"})
  }
return( res.status(200).json({
message: "Users found",
users: allUsers,
}))
}catch(err){

}
}