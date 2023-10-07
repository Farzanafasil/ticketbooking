const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://farzanaycet2009:FarzanaAtlas@cluster0.addaymv.mongodb.net/MovieAPP?retryWrites=true&w=majority')
.then(()=>{

    console.log('connceted to DB')
})
.catch((err)=>{
    console.log(`${err} connected to DB`)
})