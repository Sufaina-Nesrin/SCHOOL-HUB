const getAttendence = require("./class/getAttendence");

module.exports = {
  login: require("./auth/login"),
  getUsersCount: require("./auth/getAllUsersCount"),
  getRecentUpdates: require("./auth/getRecentUpdates"),
  createClass: require("./class/create"),
  viewClass: require("./class/view"),
  viewAllClass: require("./class/viewAll"),
  createStudent: require("./student/create"),
  viewStudent: require("./student/view"),
  viewAllStudent: require("./student/viewAll"),
  viewAllStudentByClass: require('./student/viewAllByClass'),
  createAsub: require("./subjects/createASubject"),
  createStdSub: require("./subjects/createStandardSub"),
  makeSubDis: require("./subjects/makeSubjDist"),
  viewSub: require("./subjects/view"), 
  viewAllSub : require("./subjects/viewAllSubjects"),
  viewSubClass: require("./subjects/viewSubjectsByClass"),
  createTeacher: require('./teacher/create'),
  viewTeacher: require('./teacher/view'),
  viewAllTeachers: require('./teacher/viewAll'),
  viewTeacherBySubj:require("./teacher/viewTeacherBySubj"),
  viewAllUsers: require('./getAllUsers'),
  create:require('./create'),
  classSchedule: require("./subjects/createStandardSub"),
  viewProStudent: require("./student/viewPro"),
  getAttendence : require("./class/getAttendence"),
  showStudents: require("./class/showStudents")
};
