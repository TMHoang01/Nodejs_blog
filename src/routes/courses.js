const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController.js');

router.get('/create', courseController.create);
router.post('/stored', courseController.stored);
router.post('/handle-form-courses', courseController.handeleFormCourses);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.get('/:slug', courseController.show);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDestroy);

module.exports = router;
