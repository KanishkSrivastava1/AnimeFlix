const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');

const app = new express();
// express simplyfies process of creating routes and apis
// const cstring =process.env.MONGOLINK;
const cstring = "mongodb+srv://Kanishk:kanishk20148@animeflix.9adnnrf.mongodb.net/AnimeFlix?retryWrites=true&w=majority&ssl=true"

// console.log(cstring);
mongoose.connect(cstring,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
/* Status Codes 
    100 - Inforamtion 
    200 - Succes
    300 - Redirect
    400- client error
    500 - server side erro 
*/
//cors is a web security feature that controls acess to different domains
//BYPASS SAME ORIGIN POLICY
app.use(cors());
app.use(express.json())
//Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/anime',require('./routes/anime'))

  

  
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("connected to 5000");
})


