'use strict';

const express = require('express');
const router = express.Router();

// render home page
router.get('/about', (req, res, next) => {
    
    let selected_link = 'ABOUT'
    res.render('about', { selected_link })

});

module.exports = router;