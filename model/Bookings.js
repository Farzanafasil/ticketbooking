const mongoose=require('mongoose');
const BookingSchema=mongoose.Schema({

    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      date: {
        type: Date,
        required: true,
       
      },
      seatNumbers: {
        type: [String],
        required: true,
      },
      ticketPrice: { 
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      // user: {
      //   name: {
      //     type: String,
      //     required: true,
      //   },
      //   // Add other user details as needed
      // },
      movieName: { // Add the movieName field
        type: String,
        required: true,
      },
})

const BookingModel=mongoose.model('Booking',BookingSchema)
module.exports=BookingModel