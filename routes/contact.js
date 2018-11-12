'use strict';

const express = require('express');
const router = express.Router();

// render home page
router.get('/contact', (req, res, next) => {
    
    let selected_link = 'CONTACT'
    res.render('contact', { selected_link })

});

module.exports = router;