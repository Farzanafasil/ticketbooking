const express=require('express');
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt=require('jsonwebtoken')
const reviewData=require('../model/review');
const Movie = require('../model/Movies');
const User = require('../model/User');
const { default: mongoose } = require('mongoose');




router.post('/reviews', async (req, res) => {
    try {
      const { movieId, userId, review, rating } = req.body;
      console.log(movieId)
      console.log(userId)
 console.log(review)  
      // Check if the movie and user exist
      const movie = await Movie.findById(movieId);
      const user = await User.findById(userId);
  
      if (!movie || !user) {
        return  res.status(404).json({ message: 'Movie or user not found' });
      }
  
      // Check if the user has already reviewed this movie
      const existingReview = await reviewData.findOne({ movie: movieId, user: userId });
  
      if (existingReview) {
       return res.status(400).json({ message: 'User has already reviewed this movie' });
      }
      
      // Create a new review
      const userName = user.name;
      const newReview = new reviewData({
        movie: movieId,
        user: userId,
        review,
        rating,
        userName
      });
  
      const savedReview = await newReview.save();
      return res.status(201).json({ message: 'Review added ' }); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' }); 
    }
  });
router.get('/review/:id',async(res,req)=>{
    try {
        const {id}=req.params.id;
        const movieObjectId=new mongoose.Types.ObjectId(id)
        const averageRatingPipeline=[
            {$match:{movie:movieObjectId}},
            {$group:{id:null,averageRating:{$avg:"$rating"}}},
        ]
        const averageRatingResult=await reviewData.aggregate(averageRatingPipeline)
            const reviews=await reviewData .find({movie:id}).populate("user","name",userData)
            if(reviews.length!==0){
                const averageRating=averageRatingResult.length>0?averageRatingResult[0].averageRating:0;
                res.status(200).json({reviews:reviews,
                averageRating:averageRating})
            }else{
                res.status(200).json({message:"No One Reviwed the movie"})
            }

    } catch (error) {
        console.log(error)
        req.status(500).json({message:"Internal server Error"})
        
    }
})

  
  // Get reviews for a specific movie
  router.get('/moviereview/:movieId', async (req, res) => {
    try {
      const movieId = req.params.movieId;
      const reviews = await reviewData.find({ movie: movieId });
  
      if (!reviews) {
        return res.status(404).json({ message: 'No reviews found for this movie' });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get reviews by a specific user
  router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const reviews = await reviewData({ user: userId });
  
      if (!reviews) {
        return res.status(404).json({ message: 'No reviews found for this user' });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Delete a review by ID
  router.delete('/reviews/:reviewId', async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
     
  
      const deletedReview = await reviewData.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      
  
      res.status(200).json({message:"deleted"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  module.exports = router;