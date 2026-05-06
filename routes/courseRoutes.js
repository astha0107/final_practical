const express = require('express');
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCheapCourses
} = require('../controllers/courseController');
router.post('/', createCourse);
router.get('/cheap', getCheapCourses);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
module.exports = router;