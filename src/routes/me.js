const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController.js');

router.get('/stored/courses', meController.storeCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
