const mongoose=require('mongoose')
const TheaterSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,

    },

    email:{
        type:String,
        require:true
    },
    location:{
        type:String,
        required:true,

    },
    phone:{
        type:Number,
        required:true,

    },
    password:{
        type:String,
        require:true
    },
    addedmovies:[{
       type: mongoose.Types.ObjectId,
        ref:"Movies"

    }]



})

const theatermodel=mongoose.model('Theater',TheaterSchema);

module.exports=theatermodel;