require('dotenv').config();
const router = require('express').Router();
const { apikey } = process.env
const getJSON = require('./getjson.js')
const {Videogame} = require('../db.js');
const { query } = require('express');
function pageJson(key, page){
    return `https://api.rawg.io/api/games?key=${key}&page=${page}`
}
async function getApi(arr, api){
    var data = api
    var flag = true;
    var flagArr = []
    while(flag){
        for (let i = 0; i < data.results.length;) {
            const game = {
                id: data.results[i].id,
                name: data.results[i].name,
                img: data.results[i].background_image,
                gender: data.results[i].genres
            }
            flagArr.push(game.name)
            if(flagArr){
                arr.push(game)
                i++
            }
        }
        if(flagArr.length > 18){
            flag = false;
        }
    }
}
async function api(arr, res, api, nameGame, id) {
    
    var data = api
    var flag = true
    var num = arr.length
    while(flag || num === 0){
        for (let i = 0; i < data.results.length; i++) {
            const game = {
                id: data.results[i].id,
                name: data.results[i].name,
                img: data.results[i].background_image,
                gender: data.results[i].genres
            }
            arr.push(game)
        }
        if(arr.length > 18){
            flag = false;
        }
    }
    var hash = {};
    arr = arr.filter(curr => {
        var existe = !hash[curr.name];
        hash[curr.name] = true;
        return existe
    });
    if(nameGame){
        arr = arr.filter(curr => {
            let current = curr.name.toLowerCase()
            return current.includes(nameGame)
        })
    }
    if(id){
        arr = arr.filter(curr => {
            for (let generos = 0; generos < curr.gender.length; generos++) {
                if(curr.gender[generos].id == id){
                    return curr
                }
                
            }
            if(curr.id == id){
                return curr
            }
        })
    }
    if(arr.length){
        res.json(arr)
    }else{
        res.status(404).json({error: `No hay un juego con tal nombre o el id no existe` })
    }
    console.log(id)
}

var games = []
router.get(`/videogames/`, async(req, res) => {
    const {name} = req.query
    await getJSON(`https://api.rawg.io/api/games?key=${apikey}`, async(err, data) => {
        if(err){
            return `Ocurrio un error : ${err}`
        } else{
            try {
                for (let number = 1; number < 10; number++) {
                    await getJSON(pageJson(apikey, number), async(err, datas) => {
                        if(number !== 9){
                            getApi(games, datas)
                        }else{
                            api(games, res, datas, name);
                        }
                    })
                }  
        } catch (error) {
            return `Ocurrio un error : ${error}`
        }
        }
    })
})
router.get('/videogames/:idVideogame', async(req, res)=> {
    const {idVideogame} = req.params
    await getJSON(`https://api.rawg.io/api/games?key=${apikey}`, async(err, data) => {
        if(err){
            return `Ocurrio un error : ${err}`
        } else{
            try {
                for (let number = 1; number < 10; number++) {
                    await getJSON(pageJson(apikey, number), async(err, datas) => {
                        if(number !== 9){
                            getApi(games, datas)
                        }else{
                            api(games, res, datas, null,idVideogame);
                        }
                    })
                }  
        } catch (error) {
            return `Ocurrio un error : ${error}`
        }
        }
    })
})
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
router.get('/videogame', async(req, res)=> {
    const {name, descriptio0n, rating, date, } = req.body
    
})
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
module.exports = router;