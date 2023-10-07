const express=require('express');

const router=require('express').Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const userData=require('../model/User')


//get all user
router.get('/user',async(req,res)=>{
    try {
        const data=await userData.find()
        res.send(data);
        
    } catch (error) {

        res.status(500).json({message:`${error}`})
        
    }
})


//getUserbyId




router.get('/user/:id',async(req,res)=>{
    const id = req.params.id;
    let user;
  try {
    user = await userData.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
});




//create user for signUp


router.post('/user',async (req,res)=>{
    

    try {
        let {name,email,phone,password}=req.body;
        
        let existingUser=await userData.findOne({email:email})
        console.log(existingUser);
        if(existingUser)
        {
            res.json({message:'UserAlready Exist!! Try with  another'})
        }
        else
        {
            const user=  new userData({name,email,phone,password});
             user.save();
            res.status(201).json({message:"created succesfully"})
        }
 
      
        
    } catch (error) {
        console.log("error in User Registration",error)
        res.status(500).json({message:"internal Server Error"})

        
    }

})
//Edit UserDetails


router.put('/user/:id',async(req,res)=>{

   try {
    let Id=req.params.id;
    console.log(Id)
    const item={$set:req.body}
    console.log(item)
    
    const user= await userData.findByIdAndUpdate(Id,item)

    return res.status(201).json({message:"Updated succesfully"})

   } 
   catch (error) { 

     res.send(error)

    
   }
   

})

//login

router.post('/login',async (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;
    console.log('password+++++++++')
    console.log(password)
    console.log(email)
    const user = await userData.findOne({email:email});
    console.log(user)
    if(!user){
        res.json({message:"user not found"})
    }
    try {
        if(user.password==password)
        {
            jwt.sign({email:email,id:user._id},"movie",{expiresIn:'1d'},(error,token)=>{
                if(error)
                {
                    res.json({message:"Token not Generated"})
                }
                else
                {
                     res.status(200).json({message:"Login success",token:token,data:user})

                }
            })
          
        }
        else
        {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        
    } catch (error) {

        console.log(error);
        
    }
      




})

//delete User

router.delete('/user/:id',async(req,res)=>{

   try{
    const id=req.params.id;
    const deleteddata=await userData.findByIdAndRemove(id);
    if (!deleteddata)
     {
        return res.status(500).json({ message: "Something went wrong" });
     }
   
    return res.status(200).json({message:"Deleted Succesfully"})
    res.send(deleteddata);
   }
   catch(error)
   {
    res.json({message:`${error}`})
}
    
})

module.exports=router;
