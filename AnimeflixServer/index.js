const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');

const app = new express();

const cstring =process.env.MONGOLINK;
// console.log(cstsring);
mongoose.connect(cstring,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

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


