const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Anime = require('../model/Anime');
const fetchUser = require('../middleware/fetchuser')
const router  = express.Router();
const User = require('../model/User');
const createAnime = require('../middleware/createanime');

// ROUTE1
// create Animedata or add in user list using POST "api/anime/addanime and add in list "
router.post("/addanime",fetchUser,createAnime,async (req,res)=>{ 
    try {
        const id = req.id;
        const data = req.body;
    
        const animedata = await Anime.findOne({ animelistid: data.animelistid });
    
        if (!animedata) {
            throw new Error('Anime data not found');
        }
    
        const animeId = { animeid: data.animelistid };
    
        const user = await User.findOneAndUpdate(
            { _id: id, animeId: { $not: { $elemMatch: { animeid: data.animelistid } } } },
            { $addToSet: { animeId: animeId } },
            { new: true }
        );
    
        if (!user) {
            throw new Error('Anime already exists in user list');
        }
    
        res.status(200).send();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
    
})


// ROUTE2
// get anime with AnimeListId using GET "api/anime/getanime and add in list "
router.get("/getanime/:id",fetchUser,async (req,res)=>{ 
    try {
        const id  = req.params.id;
        const animedata = await Anime.findOne({animelistid:id});
        if(!animedata){
            res.status(404).json({error: "Anime not found"});
        }
        res.status(200).json({animedata});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})

// ROUTE3
// delete anime with AnimeListId using POST "api/anime/deleteanime "
router.post("/deleteanime/:id",fetchUser,async (req,res)=>{ 
    try {
        const id  = req.params.id;
        const user = req.id;
        // console.log(yo)
        await User.updateOne({_id:user},{
            $pull:{animeId:{animeid:id}}
        })

        res.status(200).send();
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})

// ROUTE4
// get all anime in animeList using get "api/anime/getallanime "
router.get("/getallanime",fetchUser,async (req,res)=>{ 
    try {
        const uid = req.id;
        const user = await User.findOne({_id:uid});
        var js = '{"anime":[]}'
        var obj = JSON.parse(js);
        for (const element of user.animeId) {
            var anime = await Anime.findOne({ animelistid: element.animeid });
            console.log(anime);
            obj.anime.push(anime);
        }
        var newjs = JSON.stringify(obj)
        console.log(obj);
        res.status(200).send(newjs);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})



module.exports = router