'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const nodemailer = require('nodemailer');

// render home page
router.get('/contact', (req, res, next) => {
    
    let selected_link = 'CONTACT'
    res.render('contact', { selected_link })

});

// POST route from contact form
router.post('/contact_submit', function (req, res) {
    // let fileElement = document.getElementById("file");
    // inputElement.addEventListener("change", handleFiles, false);
    // function handleFiles() {
    //     let fileList = this.files; /* now you can work with the file list */
    // }
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'linearsix@gmail.com', // get this into an environment variable!
        pass: '1GmailIsEnough!' // get this into an environment variable!
      }
    });
    mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      to: 'linearsix@gmail.com',
      subject: 'New message from contact form at brandtprecision.com',
      text: `Name: ${req.body.name} - ${req.body.company} (phone: ${req.body.phone} email: ${req.body.email}) says: ${req.body.comment}`, 
      html: `<p>Name: ${req.body.name}</p><p>Company: ${req.body.company}</p><p>Phone: ${req.body.phone}</p><p>Email: ${req.body.email})</p><p>Job Specs: ${req.body.comment}</p>`, 
      attachments: [
        {
         filename: req.body.file, 
         path: req.body.file
        }
     ]
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        let selected_link = 'CONTACT_FAILURE';
        res.render('contact', { selected_link });
      }
      else {
        let selected_link = 'CONTACT_SUCCESS';
        res.render('contact', { selected_link });
      }
    });
  });


module.exports = router;