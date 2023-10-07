const mongoose=require('mongoose');
const MovieSchema=mongoose.Schema({


    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      actors: [{ type: String, required: true }],
      duration:{type: String,required:true},
      releaseDate: {
        type: Date,
        required: true,
      },
      language:[{type:String,required:true}],
      genre:[{type:String,required:true}],
      posterUrl: {
        type: String,
        required: true,
      },
      featured: {
        type: Boolean,
      },
      bookings: [],
      // theater: {
        
      //   type: mongoose.Types.ObjectId,
      //   ref: "Theater",
      //   required: true,
      // },




})


const movieModel=mongoose.model('Movie',MovieSchema)
module.exports=movieModel;