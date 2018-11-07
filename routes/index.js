'use strict';

const express = require('express');
const router = express.Router();

// render home page
router.get('/', (req, res, next) => {
    
    let selected_link = 'HOME'
    res.render('index', { selected_link })

});

module.exports = router;