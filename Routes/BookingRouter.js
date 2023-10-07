const express=require('express')
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')
const BookingData = require('../model/Bookings')
const Movie = require('../model/Movies'); // Import your Movie model
const User=require('../model/User')
const mongoose=require('mongoose')

// Import your Booking model

// Create a new booking
router.post('/newbooking', async (req, res) => {
  try {
    const {
      movieId,
      userId,
      date,
      seatNumbers,
      ticketPrice,
      totalPrice,
      movieName,
     
    } = req.body;

    // Check if the selected seats are already booked for the given movie and date
    const isSeatsAlreadyBooked = await BookingData.exists({
      movieId,
      date,
      seatNumbers: { $in: seatNumbers },
    });

    if (isSeatsAlreadyBooked) {
      // Seats are already booked, send an alert
      return res.status(400).json({ message: 'Selected seats are already booked' });
    }

    // Create a new booking document
    const newBooking = new BookingData({
      movieId,
      userId,
      date,
      seatNumbers,
      ticketPrice,
      totalPrice,
     movieName
     

      
      // Add more booking-related fields as needed
    });

    // Save the booking to the database
    await newBooking.save();

    // Handle ticket generation logic here (e.g., create a PDF ticket)

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

 
// // Cancel a booking by ID


router.delete('/cancelbooking/:Id', async (req, res) => {
  console.log('hasjdj')
  try {
    const bookingId = req.params.Id;
    console.log(bookingId)

    const deletedBooking = await BookingData.findByIdAndRemove(bookingId);// use mongoose's findbyidandremove to remove booking

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    
    res.status(200).json({ message: 'Booking canceled successfully' });// If the booking is successfully deleted, send a success response
  } catch (error) {
    console.error('Error canceling booking by ID', error);
    res.status(500).json({ error: 'Unable to cancel booking', details: error.message });
  }
});


router.get('/booking/:movieId/:date', async (req, res) => {
  try {
    const { movieId, date } = req.params;
    console.log('Received movieId:', movieId);
    console.log('Received date:', date);

    // Assuming you want to match bookings for the entire day, you can use a range query
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Set the time to 00:00:00.000
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // Set the time to 23:59:59.999

    const bookings = await BookingData.find({
      movieId,
      date: { $gte: startOfDay, $lte: endOfDay }, // Match bookings within the specified day
    });

    const bookedSeats = bookings.flatMap((booking) => booking.seatNumbers);
    res.status(200).json(bookedSeats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


router.get('/booking/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch booking details for the given userId from your database
    // Replace 'YourBookingModel' with your actual booking model
    const bookings = await BookingData.find({ userId });

    if (!bookings) {
      return res.status(404).json({ message: 'No booking details found for this user.' });
    }

    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/bookingdetails/:bookingId',async(req,res)=>{
  try {
    const { bookingId } = req.params; // Correctly destructure 'bookingId'
    console.log(bookingId);
    const bookingDetails = await BookingData.findById(bookingId);
    if (!bookingDetails) {
      return res.status(404).json({ message: 'No Booking Details' });
    }
    res.json({ bookingDetails });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/totalcollection/:movieId/:date', async (req, res) => {
  // console.log('hgjgjg')
  try {
    const { movieId, date } = req.params;
    const movieObjectId = new mongoose.Types.ObjectId(movieId);
    // Calculate the total collection for the specified movie and date
    const totalCollection = await BookingData.aggregate([
      {
        $match: {
           movieId: movieObjectId,
          

          date: new Date(date),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' }, // Sum of totalPrice from matching bookings
        },
      },
    
    ]);

    if (totalCollection.length > 0) {
      res.json({ totalCollection: totalCollection[0].total });
    } else {
      res.json({ totalCollection: 0 }); // No bookings found for the specified movie and date
    }
  } catch (error) {
    console.error('Error calculating total collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  module.exports = router;
  