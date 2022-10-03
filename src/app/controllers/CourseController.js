const Course = require('../models/Course.js');
const { mongooseToObject } = require('../util/mongoose.js');
const { mutipleMongooseToObject } = require('../util/mongoose.js');

class CourseController {

    // [GET] /course/
    index(req, res, next) {        
        Course.find({})
            .then(courses =>{ 
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    title: 'Course',
                })
            })
            .catch(error => next(error));

    }

    // [GET] /course/:slug
    show(req, res, next) {
        let slug =  req.params.slug || 'node';
        Course.findOne({ slug: slug })
            .then(course => {
                res.render('./courses/show', {
                    course: mongooseToObject(course),
                    title: 'Course',
                });
            })
            .catch(error => next(error));
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
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => next(error));
    }

    // [GET] /course/:id/edit
        edit(req, res, next) {
            Course.findById(req.params.id)
                .then(course => res.render(
                    './courses/edit', {
                        course: mongooseToObject(course),
                    })
                )
                .catch(next);
                
        }
    
        // [PUT] /course/:id
        update(req, res, next) {
            Course.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next);
        }

}

module.exports = new CourseController();
