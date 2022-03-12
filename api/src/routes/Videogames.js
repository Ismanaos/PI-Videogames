require('dotenv').config();
const router = require('express').Router();
const { apikey } = process.env
const getJSON = require('./getjson.js')
const {Videogame} = require('../db.js')

router.get('/', (req, res) => {
    var juegos = getJSON(`https://api.rawg.io/api/games?key=${apikey}`, async(err, data) => {
        if(err){
            return `Ocurrio un error : ${err}`
        }else{
            try {
                var games = []
                for (let i = 0; i < data.results.length; i++) {
                    const game = await Videogame.create({
                        name: data.results[i].name,
                        img: data.results[i].background_image,
                        gender: data.results[i].genres
                    })
                    games.push(game)
                }
                return games
            } catch (error) {
                return `Ocurrio un error : ${error}`
            }
        }
    })
    res.json(games)
})

module.exports = router;