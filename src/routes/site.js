const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');

router.get('/:slug', siteController.search);
router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', (req, res) => {
    res.send('search' + JSON.stringify(req.body));
});

router.get('/', siteController.index);

module.exports = router;
