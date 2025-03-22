const router = require('express').Router()
const changePassword = require('../controllers/test')

router.get('/student-password/:id', changePassword )

module.exports = router;