const Course = require('../models/Course');
exports.createCourse = async (req, res) => {
    try {
        const { courseName, trainer, duration, fees } = req.body;

        if (!courseName || !trainer || !duration || !fees) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        }
        if (duration <= 0 || fees <= 0) {
            return res.status(400).json({
                message: 'Duration and fees should be greater than 0'
            });
        }
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        res.status(200).json(course);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.updateCourse = async (req, res) => {
    try {

        const { duration, fees } = req.body;
        if (duration !== undefined && duration <= 0) {
            return res.status(400).json({
                message: 'Duration must be greater than 0'
            });
        }
        if (fees !== undefined && fees <= 0) {
            return res.status(400).json({
                message: 'Fees must be greater than 0'
            });
        }
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedCourse) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        res.status(200).json({
            message: 'Course deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getCheapCourses = async (req, res) => {
    try {

        const courses = await Course.find({
            fees: { $lt: 5000 }
        });

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};