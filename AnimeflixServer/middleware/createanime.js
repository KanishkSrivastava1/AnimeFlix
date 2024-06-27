const Anime = require('../model/Anime');
const mongoose = require('mongoose')
const { Schema } = mongoose;

const extractData = (input) => {
    const pictureUrlMatch = input.match(/"picture_url":\s*"([^"]+)"/);
    const titleMatch = input.match(/"title_ov":\s*"([^"]+)"/);
    const altTitlesMatch = input.match(/"alternative_titles":\s*({[^}]+})/);
    const statusMatch = input.match(/"status":\s*"([^"]+)"/);

    const pictureUrl = pictureUrlMatch ? pictureUrlMatch[1] : null;
    const title = titleMatch ? titleMatch[1] : null;
    const status = statusMatch ? statusMatch[1] : null;

    let altTitles = {};
    if (altTitlesMatch) {
        try {
            altTitles = JSON.parse(altTitlesMatch[1].replace(/(\w+):/g, '"$1":'));
        } catch (e) {
            console.error("Failed to parse alternative_titles:", e);
        }
    }

    return {
        picture_url: pictureUrl,
        title_ov: title,
        alternative_titles: altTitles,
        status
    };
};

const createAnime = async (req, res, next) => {
    const id = req.id;
    const request = req.body;
    
    const animedata = await Anime.findOne({ animelistid: request.animelistid });
    if (!animedata) {
        console.log("Anime not present");
        
        const data = extractData(JSON.stringify(request));  // Ensure request body is a string
        console.log(data);
        
        const name = data.title_ov || data.alternative_titles.english || request.title_ov || request.title_en;
        const anime = await Anime.create({
            name: name,
            animelistid: request.animelistid,
            image: data.picture_url,
            status: data.status,
        });
    }
    next();
};

module.exports =createAnime;