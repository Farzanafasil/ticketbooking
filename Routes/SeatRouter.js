
const express = require('express');
const router = express.Router();
const Booking = require('../model/Bookings'); // Import your Booking model
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')



const Seat = require('../model/seat');

// Endpoint to get available seats for a specific movie and date
router.get('/seats/:movieId/:date', async (req, res) => {
  try {
    const { movieId, date } = req.params;

    // Find all seats for the selected movie and date
    const seats = await Seat.find({ movie: movieId, date });

    res.json({ seats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;