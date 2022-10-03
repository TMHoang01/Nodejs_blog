const Course = require('../models/Course.js');
const { mongooseToObject } = require('../util/mongoose.js');
const { mutipleMongooseToObject } = require('../util/mongoose.js');

class SiteController {
    index(req, res, next) {
        
        // Course.find({}, function(err, courses) {
        //     if(!err) res.json(courses);
        //     else res.status(400).json({ error: 'ERROR!!!' });
        // });
        
        Course.find({})
            .then(courses =>{ 
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    title: 'Course',
                })
            })
            .catch(error => next(error));

    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
