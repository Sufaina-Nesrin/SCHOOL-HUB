const express = require("express");
const router = express.Router();
const jwt = require('../util/verify')
const teacherController = require('../controllers/teacher/index');

router.post('/login', teacherController.login);
router.put('/mark-attendence', jwt.verify,  teacherController.markAttendence);
router.post('/mark-score/', jwt.verify,  teacherController.markScore);
router.get('/view-student', jwt.verify,  teacherController.viewAstudent);
router.get('/view-all-classes/:id', jwt.verify,  teacherController.viewOtherClasses);
router.get('/view-class', jwt.verify,  teacherController.viewOwnClass);
router.get('/view-own-student/:id', jwt.verify,  teacherController.viewOwnStudent);
router.get('/view-all-students', jwt.verify,  teacherController.viewStudents);
router.put("/edit-profile", jwt.verify, teacherController.editProfile);
router.post("/add-new-exam", jwt.verify, teacherController.addNewExam);
router.get("/view-exam-by-class/:id", jwt.verify, teacherController.viewAllExamByClass);
router.get("/view-marks", jwt.verify, teacherController.getMarks);
router.put("/update-marks", jwt.verify, teacherController.updateMarks);

module.exports = router;