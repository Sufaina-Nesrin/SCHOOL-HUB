const express = require("express");
const router = express.Router();
const jwt = require('../util/verify')
const studentController = require("../controllers/student");

router.post('/login', studentController.login);
router.get('/view-attendence/:studentId', jwt.verify,  studentController.viewAttendence);
router.get('/view-profile', jwt.verify,  studentController.viewProfile);
router.put('/edit-profile', jwt.verify,  studentController.editProfile);

module.exports = router;