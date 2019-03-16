'use strict';
// dotenv added 2019/03/15

const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const Recaptcha = require('express-recaptcha').Recaptcha;

// render contact page
router.get('/contact', (req, res, next) => {
    
    let selected_link = 'CONTACT'
    res.render('contact', { selected_link })

});

router.post('/contact_submit', (req, res) => {
  console.log(`g-recaptcha-response: ${req.body["g-recaptcha-response"]}`);
  let captcha = req.body["g-recaptcha-response"];
  if(
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ){
    let selected_link = 'CONTACT_FAILURE'
    res.render('contact', { selected_link })
  }

  // Secret Key and Verify URL
  const secretKey = process.env.SECRET_CAPTCHA;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
  console.log(`verifyUrl: ${verifyUrl}`);
  
  // Make Request To VerifyURL
  request(verifyUrl, (err, response, verifyBody) => {
    verifyBody = JSON.parse(verifyBody);
    console.log(`recaptchaBody: ${verifyBody}`);

    // If Not Successful
    if(verifyBody.success !== undefined && !verifyBody.success){
      let selected_link = 'CONTACT_FAILURE'
    res.render('contact', { selected_link })
    } else {
      // If successful, send the mail

      let attachmentsArray = [];
      if (req.files.attachment1) {
        let attachment1 = {
          filename: req.files.attachment1.name, 
          content: req.files.attachment1.data
        }
        attachmentsArray.push(attachment1);
      };
      if (req.files.attachment2) {
        let attachment2 = {
          filename: req.files.attachment2.name, 
          content: req.files.attachment2.data
        }
        attachmentsArray.push(attachment2);
      };
      if (req.files.attachment3) {
        let attachment3 = {
          filename: req.files.attachment3.name, 
          content: req.files.attachment3.data
        }
        attachmentsArray.push(attachment3);
      };

      let mailOpts, smtpTrans;
      smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.VAR_USER,
          pass: process.env.VAR_PASS
        }
      });
      console.log(`attachmentsArray: ${attachmentsArray}`)
      mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: process.env.TO,
        subject: 'New message from contact form at brandtprecision.com',
        text: `Name: ${req.body.name}\r\nCompany: ${req.body.company}\r\nPhone: ${req.body.phone}\r\nEmail: ${req.body.email}\r\nSpecs: ${req.body.comment}\r\n`, 
        attachments: attachmentsArray
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
      let selected_link = 'CONTACT_SUCCESS';
      res.render('contact', { selected_link });
    };
  });
});

module.exports = router;
