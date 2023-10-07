const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
name:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true
},
phone:{
    type:Number,
    require:true
},
password:{
    type:String,
    requie:true
}
})

const usermodel=mongoose.model('user',userSchema)
module.exports=usermodel