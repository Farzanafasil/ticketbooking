const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider (e.g., 'gmail' for Gmail)
  auth: {
    user: 'farzanaycet2009@gmail.com', // Your email address
    pass: 'melxrckdpkxowzrq', // Your email password
  },
});

// Define a route to send a confirmation email
router.post('/sendconfirmationemail', (req, res) => {
  const { email, message } = req.body;

  // Define email content
  const emailContent = {
    from: 'farzanaycet2009@gmail.com', // Use your email address as the sender
    to: email, // Recipient's email address
    subject: 'Booking Confirmation',
    text: message, // The confirmation message you want to send
  };

  // Send the email
  transporter.sendMail(emailContent, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Email could not be sent' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

module.exports = router;