const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie', // Reference to the Movie model
    required: true,
  },
  seatNumber: {
    type: String, // You can use a string or number to represent seat numbers
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false, // Initially, seats are not booked
  },
  // You can include more information about the seat if needed, such as seat type, location, etc.
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;