const express=require('express')
const bcrypt =require('bcryptjs')
const mongoose=require('mongoose')
const morgan=require('morgan');
const app=express();
const cors=require('cors')
require('dotenv').config();
require('./DB/connection')
app.use(morgan('dev'))
app.use(cors());
const port=5000
 const path = require('path');
app.use(express.static(path.join(__dirname,'/build')));

const user=require('./Routes/UserRoutes')
app.use('/api',user)
const theater=require('./Routes/TheaterRoutes')
app.use('/api',theater)

const movies=require('./Routes/MovieRouter')
app.use('/api',movies)

const bookings=require('./Routes/BookingRouter')
app.use('/api',bookings)
const seat=require('./Routes/SeatRouter')
app.use('/api',seat)
const confirmemail=require('./Routes/ConfirmationRouter')
app.use('/api',confirmemail)
const reviews = require('./Routes/ReviewRoutes');
app.use('/api', reviews);
const passwordRecovery=require('./Routes/PasswordRecoveryRouter')
app.use('/api',passwordRecovery)

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname
    ,'/build/index.html')); });
    

app.listen((port),()=>{
    console.log(`port connetced to ${port}`)
})