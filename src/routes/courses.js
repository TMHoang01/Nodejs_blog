const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController.js');

router.get('/create', courseController.create);
router.post('/stored', courseController.stored);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.get('/:slug', courseController.show);

module.exports = router;
