const express=require('express')
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')
const nodemailer = require('nodemailer');
router.post('/recover', async (req, res) => {
    try {
      // Implement password recovery logic here
      // Generate a recovery token (you can use a package like jsonwebtoken)
      const recoveryToken = 'newpassword';
  
      // Create a Nodemailer transporter (use your email service's SMTP settings)
      const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail
        auth: {
            user: 'farzanaycet2009@gmail.com', // Your email address
            pass: 'melxrckdpkxowzrq', // Your email password
          },
      });
  
      // Define email content
      const mailOptions = {
        from: 'farzanaycet2009@gmail.com',
        to: req.body.email, // Recipient's email address (from the request)
        subject: 'Password Recovery',
        text: `Click the following link to reset your password: http://yourapp.com/reset-password?token=${recoveryToken}`,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // Return a success response
      res.status(201).json({ message: 'Password recovery email sent' });
    } catch (error) {
      // Handle errors
      console.error('Password recovery error:', error);
      res.status(500).json({ error: 'Password recovery failed' });
    }
  });
  
  module.exports = router;