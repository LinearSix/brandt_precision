'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const nodemailer = require('nodemailer');

// ################
// const multer = require('multer')
// const upload = multer({ storage: multer.memoryStorage() })

// router.post('/contact', upload.single('photo'), [
//   // validation ...
// ], (req, res) => {
//   // error handling ...

//   if (req.file) {
//     console.log('Uploaded: ', req.file)
//     // Homework: Upload file to S3
//   }

//   req.flash('success', 'Thanks for the message! I’ll be in touch :)')
//   res.redirect('/')
// })
// #################

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
      text: `${req.body.name} - ${req.body.company} (phone: ${req.body.email} email: ${req.body.email}) says: ${req.body.comment}`, 
      attachments: [
        {
         filename: req.body.file, 
         path: req.body.file
        }
     ]
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        let selected_link = 'CONTACT';
        res.render('contact_failure', { selected_link });
      }
      else {
        let selected_link = 'CONTACT';
        res.render('contact_success', { selected_link });
      }
    });
  });

module.exports = router;