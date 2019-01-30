'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// render contact page
router.get('/contact', (req, res, next) => {
    
    let selected_link = 'CONTACT'
    res.render('contact', { selected_link })

});

// POST route from contact form
router.post('/contact_submit', function (req, res, next) {
  // console.log(`body.file type: ${typeof(req.body.file)}`);
  // console.log(`body.file: ${req.body.file}`);
  // console.log(`req.files.attachment type: ${typeof(req.files.attachment)}`);
  // console.log(`file.attachment.name: ${req.files.attachment.name}`);
  console.log(`Number of Files ${Object.keys(req.files).length}`)
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
      user: 'davie@brandtprecision.com', // get this into an environment variable!
      pass: 'JunkAccount001' // get this into an environment variable!
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'linearsix@gmail.com',
    subject: 'New message from contact form at brandtprecision.com',
    text: `Name: ${req.body.name}\r\nCompany: ${req.body.company}\r\nPhone: ${req.body.phone}\r\nEmail: ${req.body.email}\r\nSpecs: ${req.body.comment}\r\n`, 
    attachments: [
      {
        filename: req.files.attachment1.name,
        content: req.files.attachment1.data
      },
      {
        filename: req.files.attachment2.name,
        content: req.files.attachment2.data
      },
      {
        filename: req.files.attachment3.name,
        content: req.files.attachment3.data
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