const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnimeSchema = new Schema({
    name: {
      type:String,
      required:true,
      unique:true
    }, 
    animelistid:{
        type:String,
        unique:true,
        require:true
    },
    status :{
        type:String,
        required:true
    },
    image: {
      type:String,
      default:"https://www.google.com/imgres?imgurl=https%3A%2F%2Ffilmdaily.co%2Fwp-content%2Fuploads%2F2021%2F06%2Faf-02-1.jpg&tbnid=jSbKZxJbUioGMM&vet=12ahUKEwih3dWUvdz_AhXQ_zgGHZEcCA4QMygIegUIARCWAQ..i&imgrefurl=https%3A%2F%2Ffilmdaily.co%2Fnews%2Fanimeflix-shutdown%2F&docid=LW7-6vyooo-MoM&w=1280&h=720&q=logo%20animeflix&hl=en&ved=2ahUKEwih3dWUvdz_AhXQ_zgGHZEcCA4QMygIegUIARCWAQ"
    }, 
    date :{
      type:Date,
      default:Date.now
    }

    
  });
  const Anime = mongoose.model('anime',AnimeSchema)
  module.exports = Anime