const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/User');
const { query, validationResult, body } = require('express-validator');
const router = express.Router();
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchuser')


// to create token for authorisation 
const jwtSecret = "klaud approves this";

//post is used when changes to our server are made 
//get is used to obt info from api, no change in server

//req - request, data sent by client to the server
// res - response, data the server is sending to client 

//bcrypt is used to hash/encrypt the password 
//SALT is a string generally added to the original password before encryting

//jwt is a way to create token btw to parties 
// a jwt secret token is created to authorize the token 

// ROUTE1
// Create a new User using POST "api/auth/createUser" No Login req 
router.post('/createUser', [
    body('username', 'Enter a valid username').isLength({ min: 2 }),
    body('email', "enter email").isEmail(),
    body("password", "Password must be atleast 4 character").isLength({ min: 4 })
],
    async (req, res) => {
        // if error return bad req 
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        try {
            // finding user with same username or email
            let user = await User.findOne({ email: req.body.email } || { username: req.body.username })
            if (user) {
                return res.status(400).json({ error: "user with this email or username already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const securedpass = await bcrypt.hash(req.body.password,salt);

            // create new user 
            user = await User.create({
                username: req.body.username,
                password: securedpass,
                email: req.body.email,
            })

            // providing the token 
            const data ={
                id:user.id
            }
            // virtual signature 
            const token = jwt.sign(data,jwtSecret);

            res.status(200).json({token:token, succes:true});

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured")
        }
    })

// **************************

// ROUTE2
// to login user using post req at "api/auth/loginUser" No Login required
router.post("/loginUser",[
    body('username', 'Enter a valid username').isLength({ min: 2 }),
    body("password", "Password cannot be blanked").exists()
],
    async (req,res)=>{
        // if error return bad req 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({username:req.body.username})
            if(!user){
                return res.status(400).json({error:"Please try to login with correct Username "})
            }
            const passwordCompare = await bcrypt.compare(req.body.password,user.password);
            if(!passwordCompare){
                return res.status(400).json({error:"Please try to login with correct credentials "})
            }
            const data ={
                id:user.id
            }
            const token = jwt.sign(data,jwtSecret);
            res.json({authtoken:token});

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured")
        }

})

// ******************

// ROUTE3
// get loggedin User details using POST "api/auth/getuser" Login Req
router.post("/getuser",fetchUser,async (req,res)=>{ 
        try {
           const userId = req.id;
           let user = await User.findOne({_id:userId}).select("-password")
           console.log(user)
            res.send(user)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured")
        }
})

module.exports = router