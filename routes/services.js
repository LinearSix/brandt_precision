'use strict';

const express = require('express');
const router = express.Router();

// render home page
router.get('/services', (req, res, next) => {
    
    let selected_link = 'SERVICES'
    res.render('services', { selected_link })

});

module.exports = router;