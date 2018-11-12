'use strict';

const express = require('express');
const router = express.Router();

// render home page
router.get('/portfolio', (req, res, next) => {
    
    let selected_link = 'PORTFOLIO'
    res.render('portfolio', { selected_link })

});

module.exports = router;