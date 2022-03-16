const getJSON = require('./getjson.js')
const {apikey} = process.env
const router = require('express').Router()

router.get('/genres', (req, res) => {
    var arrayGame = []
    getJSON(`https://api.rawg.io/api/genres?key=${apikey}`, async(err, data)=>{
      if(err){
        return err
      }else{
            try {
            for (let i = 0; i < data.results.length; i++) {
                    const obj = {
                        id:data.results[i].name,
                        name:data.results[i].id
                    }
                    // Genre.create({
                    //     id,
                    //     name
                    // })
                    arrayGame.push(obj)
            }
            } catch (error) {
                return error
            }
        }
        res.json(arrayGame)
    })
})

module.exports = router;
// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí