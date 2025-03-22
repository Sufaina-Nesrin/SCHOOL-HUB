const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/index");
const jwt = require('../util/verify')

router.post("/create", adminController.create);
router.get("/get-users-count",  adminController.getUsersCount);
router.get("/get-recent-updates", jwt.verify, adminController.getRecentUpdates);

router.get("/user/view-all", jwt.verify, adminController.viewAllUsers);
// Routes for classes
router.post("/class/create", jwt.verify,  adminController.createClass);
router.get("/class/view/:classId", jwt.verify,  adminController.viewClass);
router.get("/class/view-all", jwt.verify,  adminController.viewAllClass);
router.get("/class/getAttendence/:classId", adminController.getAttendence);
router.get("/class/show-students/:id", jwt.verify, adminController.showStudents);

// Routes for students
router.post("/student/create", jwt.verify,  adminController.createStudent);
router.get("/student/view/:studentId", jwt.verify, adminController.viewStudent);
router.get("/student/view-all", jwt.verify,  adminController.viewAllStudent);
router.get("/student/view-all-by-class/:id", jwt.verify, adminController.viewAllStudentByClass);
router.get("/student/view-full-profile/:studentId", jwt.verify, adminController.viewProStudent);

// Routes for subjects
router.post("/subject/create", jwt.verify,  adminController.createAsub);
router.post("/subject/create-standard", jwt.verify,  adminController.createStdSub);
router.put("/subject/distribute", jwt.verify,  adminController.makeSubDis);
router.get("/subject/view-class/:classId", jwt.verify,  adminController.viewSubClass);
router.get("/subject/view-all", adminController.viewAllSub);
router.get("/view-subject/:subjectId", jwt.verify, adminController.viewSub); //new
router.post("/subject/create-class-schedule", adminController.classSchedule);

// Routes for teachers
router.post("/teacher/create", jwt.verify,  adminController.createTeacher);
router.get("/teacher/view/:teacherId", jwt.verify,  adminController.viewTeacher);
router.get("/teacher/view-all", jwt.verify,  adminController.viewAllTeachers);
router.get("/teacher/view-on-sub/:subjectId", jwt.verify, adminController.viewTeacherBySubj);

module.exports = router;

