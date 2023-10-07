const express=require('express');
const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))

const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const theaterData=require('../model/Theater')


//addTheater

router.post('/theater', async(req,res)=>{
    try {
        const {email,password}=req.body;
       
        const existinguser= await theaterData.findOne({email:email})
        if(existinguser)
        {
            return res.status(400).json({message:"User Already Exist"})
        }
        else
        {
            const theater=await theaterData({email,password})
            theater.save()
            res.send(theater);
            return res.status(200).json({message:"created Succesfully",})
        }

        
    } catch (error) {

        return console.log(error);

    }
})

//get theaters


router.get('/theater',async(req,res)=>{

   let theaters;

   try {

    theaters=await theaterData.find();

    if(!theaters)
    {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ theaters });
    // res.send(theaters)
    
   } catch (error) {
    console.log(error)
   }


})

//getTheaters by id



router.get('/theater/:id',async(req,res)=>{

    const Id = req.params.id;
    console.log(Id)
  
    let TheaterAdmin;
    try {
      TheaterAdmin = await theaterData.findById(Id);
    } catch (err) {
      return console.log(err);
    }
    if (!TheaterAdmin) {
      return console.log("Cannot find Admin");
    }
    return res.status(200).json({ TheaterAdmin});
  
})




//Login Theater Admin



router.post('/theaterlogin',async(req,res)=>{
    

//   let email = req.body.email;
//   let password = req.body.password;


   const {email,password}=req.body
  console.log('password+++++++++')
  console.log(password)
  console.log(email)
  const TheaterAdmin = await theaterData.findOne({email});
  console.log(TheaterAdmin)
     if(!TheaterAdmin)
     {
        return res.status(400).json({ message: "Admin not found" })
     }
     try {
       

        if(TheaterAdmin.password==password)
        {
            jwt.sign({email:email,id:TheaterAdmin._id},"Movie",{expiresIn:'1d'},(error,token)=>{
                

                if(error)
                {
                    res.json({message:"Token not Generated"})
                }
                else
                {
                    return res.status(200).json({message:"Login success",token:token,theater:TheaterAdmin})

                }
            })
      
        }
    
  } catch (error) {
    console.log(error)
    
  }


})




router.put('/theater/:id', async (req, res) => {
    try {
      const Id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(Id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
      }
      const updatedItem ={$set:req.body}; // You don't need to wrap it in $set
  
      const theater = await theaterData.findByIdAndUpdate(Id, updatedItem);
  
      if (!theater) {
        return res.status(404).json({ message: "Theater not found" });
      }
  
      return res.status(201).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error updating theater:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.post('/change-password', async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      // Find the user with the provided token
      const user = await theaterData.findOne({
        passwordResetToken: token,
        passwordResetTokenExpiration: { $gte: Date.now() },
      });
  
      if (!user) {
        // Token is invalid or has expired, return an error message
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Update the user's password and clear the reset token fields
      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiration = undefined;
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error in change password route:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports=router;
