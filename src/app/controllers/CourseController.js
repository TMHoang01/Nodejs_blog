const e = require('express');
const Course = require('../models/Course.js');
const { mongooseToObject } = require('../util/mongoose.js');
const { mutipleMongooseToObject } = require('../util/mongoose.js');

class CourseController {
    // [GET] /course/
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    title: 'Course',
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /course/:slug
    show(req, res, next) {
        let slug = req.params.slug || 'node';
        Course.findOne({ slug: slug })
            .then((course) => {
                res.render('./courses/show', {
                    course: mongooseToObject(course),
                    title: 'Course',
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('./courses/create');
    }

    // POST /course/store
    stored(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/maxresdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses/'))
            .catch((error) => next(error));
    }

    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('./courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [Delete] /course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [Delete] /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /course/handele-form-courses
    handeleFormCourses(req, res, next) {
        let action = req.body.action;

        switch (action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            case 'forceDestroy':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);

            default:
                res.json({ message: 'Action is invalid' });
        }

    }
}

module.exports = new CourseController();
