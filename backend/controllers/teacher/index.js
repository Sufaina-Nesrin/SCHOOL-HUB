const addNewExam = require("./addNewExam");


module.exports = {
  login: require("./login"),
  markAttendence: require("./markAttendance"),
  markScore: require("./markScore"),
  updateScore: require("./updateScore"), //The function is not defined yet
  viewAstudent: require("./viewAstudent"),
  viewOtherClasses: require("./viewOtherClasses"),
  viewOwnClass: require("./viewOwnClass"),
  viewOwnStudent: require("./viewOwnStudent"),
  viewStudents: require("./viewStudents"),
  editProfile: require("./editProfile"),
  addNewExam: require("./addNewExam"),
  viewAllExamByClass: require("./viewExamsByClass"),
  getMarks : require("./getMarks"),
  updateMarks: require("./updateScore")

};
