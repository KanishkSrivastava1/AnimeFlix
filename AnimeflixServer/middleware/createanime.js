const Anime = require('../model/Anime');
const mongoose = require('mongoose')
const { Schema } = mongoose;


const createAnime = async(req,res, next)=>{
    const id  = req.id;
        const d = req.body;

        console.log(d.title_ov)
        const animedata = await Anime.findOne({animelistid:d.myanimelist_id});
        if(!animedata){
            const n  = d.title_ov || d.title_en
            const anime = await Anime.create({
                name:n,
                animelistid:d.animelistid,
                image:d.picture_url,
                status:d.information.status,
            })
            
        }
        next();
}
module.exports =createAnime;