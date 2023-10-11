const Anime = require('../model/Anime');
const mongoose = require('mongoose')
const { Schema } = mongoose;


const createAnime = async(req,res, next)=>{
    const id  = req.id;
        const d = req.body;
        console.log(d)
        const animedata = await Anime.findOne({animelistid:d.animelistid});
        if(!animedata){
            const anime = await Anime.create({
                name:d.data.title_ov,
                animelistid:d.animelistid,
                image:d.data.picture_url,
                status:d.data.information.status,
            })
            
        }
        next();
}
module.exports =createAnime;