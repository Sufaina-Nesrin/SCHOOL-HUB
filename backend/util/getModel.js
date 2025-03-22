module.exports = async(userType)=> {
    if (userType === 'teacher') {
      return Teacher; // Return Teacher model
    } else if (userType === 'student') {
      return Student; // Return Student model
    } else {
      throw new Error('Invalid user type');
    }
  }
  